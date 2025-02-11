/*
 * Copyright (c) 2021 Robert Bosch Manufacturing Solutions GmbH
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package net.catenax.semantics.registry;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import net.catenax.semantics.registry.api.TwinsApiDelegate;
import net.catenax.semantics.registry.model.DigitalTwin;
import net.catenax.semantics.registry.model.DigitalTwinCollection;
import net.catenax.semantics.registry.model.DigitalTwinCreate;
import net.catenax.semantics.registry.persistence.PersistenceLayer;

@Service
public class CustomTwinsApiDelegate implements TwinsApiDelegate {
   private final Map<String, DigitalTwin> digitalTwins = new ConcurrentHashMap<>();

   @Autowired
   PersistenceLayer persistence;

   @Override
   public ResponseEntity<DigitalTwin> getTwinById( final String twinId ) {
      final DigitalTwin digitalTwin = persistence.getTwin(twinId);
      if ( null == digitalTwin ) {
         return ResponseEntity.notFound().build();
      }
      return new ResponseEntity<>( digitalTwin, HttpStatus.OK );
   }

   @Override
   public ResponseEntity<List<DigitalTwin>> createTwin( final List<DigitalTwinCreate> digitalTwinCreate ) {
      List<DigitalTwin> digitalTwinResult = persistence.insertTwinList(digitalTwinCreate);

      return new ResponseEntity<>( digitalTwinResult, HttpStatus.OK );
   }

   @Override
   public ResponseEntity<Void> deleteTwinById( final String twinId ) {
      if(!persistence.deleteTwin(twinId)) {
         return ResponseEntity.notFound().build();
      }

      return ResponseEntity.noContent().build();
   }

   @Override
   public ResponseEntity<DigitalTwinCollection> getTwinByQuery(String key, String value, Integer pageSize, Integer page) {
      DigitalTwinCollection twinCollection = persistence.getTwins(key, value, pageSize, page);

      return new ResponseEntity<>(twinCollection, HttpStatus.OK );
   }
}
