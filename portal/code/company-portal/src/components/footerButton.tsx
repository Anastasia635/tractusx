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

import * as React from "react";
import {Row} from "react-bootstrap";
import Button from "./button";
import UserService from '../helpers/UserService';

export const FooterButton = ({ labelBack, labelNext, handleBackClick, handleNextClick }) => {    

return(
 <div className="mx-auto col-9 info">
 <Row>
   <div className="col12 d-flex align-items-center justify-content-center">
     Please enter all the required information before proceeding.
     More information in our <a href=""> help section</a>.
   </div>
   <div className="col12 d-flex align-items-center justify-content-center button-section">
     <Button
       styleClass="button btn-default"
       label={labelBack}
       handleClick={handleBackClick}
     />
     <Button
       label={labelNext}
       styleClass="button btn-primaryCax"
       handleClick={handleNextClick}
     />
   </div>
 </Row>
</div>
)
}

export default FooterButton