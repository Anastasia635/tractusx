// Copyright (c) 2021 Microsoft
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {useState} from "react";
import { Row } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from 'react-i18next';
import FooterButton from "./footerButton";
import {connect} from 'react-redux';
import {IState} from "../types/store/redux.store.types";
import {addCurrentStep} from "../actions/user.action";
import { withRouter } from 'react-router-dom';
import {Dispatch} from 'redux';


interface CompanyRoleProps {
  currentActiveStep: number;
  addCurrentStep: (step: number) => void;
}

export const CompanyRoleCax = ({currentActiveStep, addCurrentStep}: CompanyRoleProps) => {

  const { t } = useTranslation();
  const [companyRoleChecked, setcompanyRoleChecked] =  useState(new Map());

  // const companyRoleChecked =  new Map();

  const backClick = () => {
    addCurrentStep(currentActiveStep-1)
}

const nextClick = () => {
  addCurrentStep(currentActiveStep+1)
}

    const handleCheck = (e) => {
      console.log(e);
        if (e.target.checked === false && companyRoleChecked.has(e.target.name)) 
        {
          let roleCheckedcopy = new Map(companyRoleChecked);
          roleCheckedcopy.delete(e.target.name);
            setcompanyRoleChecked(roleCheckedcopy);
        } else {
          setcompanyRoleChecked(new Map(companyRoleChecked.set(e.target.name, e.target.checked)));
        }
    
        console.log(e.target.checked, e.target.name);
        console.log(companyRoleChecked);
      }
    
    return (
      <>
        <div className="mx-auto col-9 container-registration">
        <div className="head-section">
          <div className="mx-auto step-highlight d-flex align-items-center justify-content-center">
            3
          </div>
          <h4 className="mx-auto d-flex align-items-center justify-content-center">
          {t("companyRole.title")}
          </h4>
          <div className="mx-auto text-center col-9">
          {t("companyRole.subTitle")}
          </div>
        </div>
        <div className="companydata-form mx-auto col-9">
          <div className="company-role-section">
            <Row>
              <div className="col-1">
                <input
                  type="checkbox"
                  name="activeParticipant"
                  className="regular-checkbox"
                  onChange={(e) => handleCheck(e)}
                />
              </div>
              <div className="col-11">
                <label>
                  Active participant (OEM, supplier, KMU/SME)
                </label>
                <div
                  className={
                    !companyRoleChecked.has("activeParticipant") ||
                    !companyRoleChecked.get("activeParticipant")
                      ? "companyRoleVisible"
                      : "companyRoleHidden"
                  }
                >
                  <div>
                    The role of the 'Active participant' is relevant if
                    you want to:
                  </div>
                  <ul>
                    <li>
                      provide and /or consume business data (e.g. parts
                      master data)
                    </li>
                    <li>
                      use the offered portal business applications
                    </li>
                  </ul>
                </div>
                <div
                  className={
                    !companyRoleChecked.has("activeParticipant") ||
                    !companyRoleChecked.get("activeParticipant")
                      ? "companyRoleHidden"
                      : "companyRoleVisible companyRoleTnc"
                  }
                >
                  <div>
                    Please check and agree to the items listed below:
                  </div>
                  <ul>
                    <li>
                      <input
                        type="checkbox"
                        className="regular-checkbox"
                      />
                      <span>
                        Yes, I agree to the <span className="underlineTnc">
                          terms and conditions
                        </span> of the
                        selected role.
                      </span>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        className="regular-checkbox"
                      />
                      <span>
                        Yes, I agree to the <span className="underlineTnc">security regulations</span> of the
                        selected role.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </Row>
          </div>
          <div className="company-role-section">
            <Row>
              <div className="col-1">
                <input
                  type="checkbox"
                  name="appProvider"
                  className="regular-checkbox"
                  onChange={(e) => handleCheck(e)}
                />
              </div>
              <div className="col-11">
                <label>App provider</label>
                <div
                  className={
                    !companyRoleChecked.has("appProvider") ||
                    !companyRoleChecked.get("appProvider")
                      ? "companyRoleVisible"
                      : "companyRoleHidden"
                  }
                >
                  <div>
                    The role of the 'App Provider' is relevant if you
                    want to:
                  </div>
                  <ul>
                    <li>
                      provide apps/services within the Catena-X
                      ecosystem
                    </li>
                  </ul>
                </div>
                <div
                  className={
                    !companyRoleChecked.has("appProvider") ||
                    !companyRoleChecked.get("appProvider")
                      ? "companyRoleHidden"
                      : "companyRoleVisible companyRoleTnc"
                  }
                >
                  <div>
                    Please check and agree to the items listed below:
                  </div>
                  <ul>
                    <li>
                      <input
                        type="checkbox"
                        className="regular-checkbox"
                      />
                      <span>
                        Yes, I agree to the <span className="underlineTnc">terms and conditions</span> of the selected role.
                      </span>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        className="regular-checkbox"
                      />
                      <span>
                        Yes, I agree to the <span className="underlineTnc">security regulations</span> of the
                        selected role.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </Row>
          </div>
          <div className="company-role-section">
            <Row>
              <div className="col-1">
                <input
                  type="checkbox"
                  name="operationAndInfra"
                  className="regular-checkbox"
                  onChange={(e) => handleCheck(e)}
                />
              </div>
              <div className="col-11">
                <label>Operation and infrastructure provider</label>
                <div
                  className={
                    !companyRoleChecked.has("operationAndInfra") ||
                    !companyRoleChecked.get("operationAndInfra")
                      ? "companyRoleVisible"
                      : "companyRoleHidden"
                  }
                >
                  <div>
                    The role of the 'App Provider' is relevant if you:
                  </div>
                  <ul>
                    <li>
                      provide operations and /or infrastructure services
                      within the Catena-X network
                    </li>
                  </ul>
                </div>
                <div
                  className={
                    !companyRoleChecked.has("operationAndInfra") ||
                    !companyRoleChecked.get("operationAndInfra")
                      ? "companyRoleHidden"
                      : "companyRoleVisible companyRoleTnc"
                  }
                >
                  <div>
                    Please check and agree to the items listed below:
                  </div>
                  <ul>
                    <li>
                      <input
                        type="checkbox"
                        className="regular-checkbox"
                      />
                      <span>
                        Yes, I agree to the <span className="underlineTnc">
                          terms and conditions
                        </span> of the
                        selected role.
                      </span>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        className="regular-checkbox"
                      />
                      <span>
                        Yes, I agree to the <span className="underlineTnc">security regulations</span> of the
                        selected role.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </Row>
          </div>
        </div>
      </div>
       <FooterButton 
        labelBack={t('button.back')}
        labelNext={t('button.confirm')}
       handleBackClick={() => backClick()}
       handleNextClick={() => nextClick()}
    />
    </>
    );
}


const mapDispatchToProps = (dispatch: Dispatch) => ({
  addCurrentStep: (step: number) => {
      dispatch(addCurrentStep(step));
  },
});


export default withRouter(connect(
  (state: IState) => ({
      currentActiveStep: state.user.currentStep,
  }),
  mapDispatchToProps
)(CompanyRoleCax));
