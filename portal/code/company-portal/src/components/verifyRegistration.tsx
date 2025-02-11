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
import { FaEdit } from "react-icons/fa";

interface VerifyRegistrationProps {
  currentActiveStep: number;
  addCurrentStep: (step: number) => void;
}

export const VerifyRegistration = ({currentActiveStep, addCurrentStep}: VerifyRegistrationProps) => {

  const { t } = useTranslation();

  const editClick = (n) => {
    // setcurrentActiveStep(n);
  }
  // const companyRoleChecked =  new Map();

  const backClick = () => {
    addCurrentStep(currentActiveStep-1)
}

const nextClick = () => {
  addCurrentStep(currentActiveStep+1)
}

    
    return (
      <>
         <div className="mx-auto col-9 container-registration">
                <div className="head-section">
                  <div className="mx-auto step-highlight d-flex align-items-center justify-content-center">
                    5
                  </div>
                  <h4 className="mx-auto d-flex align-items-center justify-content-center">
                  Verify your registration data
                  </h4>
                  <div className="mx-auto text-center col-9">
                  Lorem ipsum sapientem ne neque dolor erat,eros solet invidunt duo Quisque aliquid leo. Pretium patrioque sociis eu nihil Cum enim ad.
                  </div>
                </div>
                <div className="companydata-form mx-auto col-9">
                  <Row>
                    <ul className="list-group-cax px-2">
                      <li className="list-group-item-cax list-header">
                        <Row>
                          <span className="col-11">Company Data</span>
                          <span className="col-1" onClick={()=>editClick(1)}><FaEdit className="editIcon"/></span>
                        </Row>
                      </li>
                      <li className="list-group-item-cax">
                        <Row>
                          <span className="col-6">BPN</span>
                          <span className="col-6">BPNL890867291</span>
                        </Row>
                      </li>
                      <li className="list-group-item-cax">
                        <Row>
                          <span className="col-6">Legal Entity Name</span>
                          <span className="col-6">German Car Factory</span>
                        </Row>
                      </li>
                      <li className="list-group-item-cax">
                        <Row>
                          <span className="col-6">Registered Name</span>
                          <span className="col-6"></span>
                        </Row>
                      </li>
                      <li className="list-group-item-cax">
                        <Row>
                          <span className="col-6">Street</span>
                          <span className="col-6">Munich Street</span>
                        </Row>
                      </li>
                      <li className="list-group-item-cax">
                        <Row>
                          <span className="col-6">PLZ / City</span>
                          <span className="col-6">80807 Munich</span>
                        </Row>
                      </li>
                      <li className="list-group-item-cax">
                        <Row>
                          <span className="col-6">Country</span>
                          <span className="col-6">Germany</span>
                        </Row>
                      </li>
                      <li className="list-group-item-cax">
                        <Row>
                          <span className="col-6">State of activity</span>
                          <span className="col-6"></span>
                        </Row>
                      </li>
                      <li className="list-group-item-cax">
                        <Row>
                          <span className="col-6">Valid from</span>
                          <span className="col-6"></span>
                        </Row>
                      </li>
                      <li className="list-group-item-cax">
                        <Row>
                          <span className="col-6">Valid till</span>
                          <span className="col-6"></span>
                        </Row>
                      </li>
                     
                    </ul>
                  </Row>
                  <Row>
                  <ul className="list-group-cax px-2">
                      <li className="list-group-item-cax list-header">
                        <Row>
                          <span className="col-11">Active Role</span>
                          <span className="col-1" onClick={()=>editClick(2)}><FaEdit className="editIcon"/></span>
                        </Row>
                      </li>
                      <li className="list-group-item-cax">
                        <Row>
                          <span className="col-12">Active participant</span>
                        </Row>
                      </li>
                      </ul>
                  </Row>
                  <Row>
                  <ul className="list-group-cax px-2">
                      <li className="list-group-item-cax list-header">
                        <Row>
                          <span className="col-11">Uploaded certificates</span>
                          <span className="col-1" onClick={()=>editClick(3)}><FaEdit  className="editIcon"/></span>
                        </Row>
                      </li>
                      <li className="list-group-item-cax">
                        <Row>
                          <span className="col-12">certificate of approval.pdf</span>
                        </Row>
                      </li>
                      <li className="list-group-item-cax">
                        <Row>
                          <span className="col-12">certificate of incorporation.pdf</span>
                        </Row>
                      </li>
                      <li className="list-group-item-cax">
                        <Row>
                          <span className="col-12">certificate of deposit.pdf</span>
                        </Row>
                      </li>
                      </ul>
                  </Row>
                </div>
              </div>
       <FooterButton 
       labelBack={t('button.back')}
       labelNext={t('button.submit')}
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
)(VerifyRegistration));
