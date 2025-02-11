//
// Copyright (c) 2021 Copyright Holder (Catena-X Consortium)
//
// See the AUTHORS file(s) distributed with this work for additional
// information regarding authorship.
//
// See the LICENSE file(s) distributed with this work for
// additional information regarding license terms.
//
package net.catenax.prs.integrationtest;

import net.catenax.prs.controllers.ApiErrorsConstants;
import net.catenax.prs.dtos.PartsTreeView;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.http.HttpStatus;

import java.text.MessageFormat;
import java.util.List;

import static io.restassured.RestAssured.given;
import static net.catenax.prs.dtos.PartsTreeView.AS_MAINTAINED;
import static net.javacrumbs.jsonunit.assertj.JsonAssertions.assertThatJson;
import static net.javacrumbs.jsonunit.core.Option.IGNORING_ARRAY_ORDER;
import static org.hamcrest.Matchers.hasSize;

public class GetPartsTreeByObjectIdIntegrationTests extends PrsIntegrationTestsBase {

    private static final String PART_ONE_ID = "ZF";
    private static final String PART_OBJECT_ID = "I88HJHS45";
    private static final String DEPTH = "depth";
    private static final String ASPECT = "aspect";
    private static final String RELATIONSHIPS = "relationships";
    private static final String PART_INFOS = "partInfos";

    @ParameterizedTest
    @EnumSource(PartsTreeView.class)
    public void getPartsTreeByObjectId_success(PartsTreeView view) {

        var response =
            given()
                .pathParam(ONE_ID_MANUFACTURER, PART_ONE_ID)
                .pathParam(OBJECT_ID_MANUFACTURER, PART_OBJECT_ID)
                .queryParam(VIEW, view)
            .when()
                .get(PATH)
            .then()
                .assertThat()
                    .statusCode(HttpStatus.OK.value())
            .extract().asString();

        assertThatJson(response)
                .when(IGNORING_ARRAY_ORDER)
                .isEqualTo(expected.sampleGearboxPartTree());
    }

    @Test
    public void getPartsTreeByObjectId_notExistingObjectid_emptyResponse() {
        given()
            .pathParam(ONE_ID_MANUFACTURER, PART_ONE_ID)
            .pathParam(OBJECT_ID_MANUFACTURER, "not-existing-object-id")
            .queryParam(VIEW, AS_MAINTAINED)
        .when()
            .get(PATH)
        .then()
            .assertThat()
                .statusCode(HttpStatus.OK.value())
                .body(RELATIONSHIPS, hasSize(0))
                .body(PART_INFOS, hasSize(0));
    }

    @Test
    public void getPartsTreeByObjectId_notExistingOneId_emptyResponse() {
        given()
            .pathParam(ONE_ID_MANUFACTURER, "not-existing-one-id")
            .pathParam(OBJECT_ID_MANUFACTURER, PART_OBJECT_ID)
            .queryParam(VIEW, AS_MAINTAINED)
        .when()
            .get(PATH)
        .then()
            .assertThat()
            .statusCode(HttpStatus.OK.value())
            .body(RELATIONSHIPS, hasSize(0))
            .body(PART_INFOS, hasSize(0));
    }

    @Test
    public void getPartsTreeByObjectId_noView_returns400() {
        var response =
               given()
                   .pathParam(ONE_ID_MANUFACTURER, PART_ONE_ID)
                   .pathParam(OBJECT_ID_MANUFACTURER, PART_OBJECT_ID)
               .when()
                   .get(PATH)
               .then()
                   .assertThat()
                   .statusCode(HttpStatus.BAD_REQUEST.value())
                   .extract().asString();

        assertThatJson(response)
                .isEqualTo(expected.invalidArgument(List.of(VIEW +":"+ ApiErrorsConstants.PARTS_TREE_VIEW_NOT_NULL)));
    }

    @Test
    public void getPartsTreeByObjectId_exceedMaxDepth_returns400() {
        var maxDepth = configuration.getPartsTreeMaxDepth();
        var response =
                given()
                        .pathParam(ONE_ID_MANUFACTURER, PART_ONE_ID)
                        .pathParam(OBJECT_ID_MANUFACTURER, PART_OBJECT_ID)
                        .queryParam(VIEW, AS_MAINTAINED)
                        .queryParam(DEPTH, maxDepth + 1)
                .when()
                        .get(PATH)
                .then()
                        .assertThat()
                        .statusCode(HttpStatus.BAD_REQUEST.value())
                        .extract().asString();

        assertThatJson(response)
                .isEqualTo(expected.invalidMaxDepth(List.of(MessageFormat.format(ApiErrorsConstants.PARTS_TREE_MAX_DEPTH, maxDepth))));
    }

    @ParameterizedTest
    @EnumSource(PartsTreeView.class)
    public void getPartsTreeByObjectId_directChildren_success(PartsTreeView view) {

        var response =
                given()
                        .pathParam(ONE_ID_MANUFACTURER, PART_ONE_ID)
                        .pathParam(OBJECT_ID_MANUFACTURER, PART_OBJECT_ID)
                        .queryParam(VIEW, view)
                        .queryParam(DEPTH, 1)
                .when()
                        .get(PATH)
                .then()
                        .assertThat()
                        .statusCode(HttpStatus.OK.value())
                        .extract().asString();

        assertThatJson(response)
                .when(IGNORING_ARRAY_ORDER)
                .isEqualTo(expected.sampleGearboxDirectChildren());
    }

    @ParameterizedTest
    @EnumSource(PartsTreeView.class)
    public void getPartsTreeByObjectId_CEAspect_success(PartsTreeView view) {

        var response =
                given()
                        .pathParam(ONE_ID_MANUFACTURER, PART_ONE_ID)
                        .pathParam(OBJECT_ID_MANUFACTURER, PART_OBJECT_ID)
                        .queryParam(VIEW, view)
                        .queryParam(ASPECT, "CE")
                .when()
                        .get(PATH)
                .then()
                        .assertThat()
                        .statusCode(HttpStatus.OK.value())
                        .extract().asString();

        assertThatJson(response)
                .when(IGNORING_ARRAY_ORDER)
                .isEqualTo(expected.sampleGearboxPartTreeWithAspects());
    }

    @ParameterizedTest
    @EnumSource(PartsTreeView.class)
    public void getPartsTreeByObjectId_leafNode_searchedNode(PartsTreeView view) {

        // a part with no children
        var leafPart = expected.gearwheelpinPartId2();

        var response =
                given()
                        .pathParam(ONE_ID_MANUFACTURER, leafPart.getOneIDManufacturer())
                        .pathParam(OBJECT_ID_MANUFACTURER, leafPart.getObjectIDManufacturer())
                        .queryParam(VIEW, view)
                .when()
                        .get(PATH)
                .then()
                        .assertThat()
                        .statusCode(HttpStatus.OK.value())
                        .extract().asString();

        assertThatJson(response)
                .when(IGNORING_ARRAY_ORDER)
                .isEqualTo(expected.sampleLeafNodeGearboxPartTreeWithTypeName());
    }
}
