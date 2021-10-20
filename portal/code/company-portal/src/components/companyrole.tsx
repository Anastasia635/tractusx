// Copyright (c) 2021 Microsoft
//
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as React from 'react';
import { observer } from 'mobx-react';
import { Dropdown, IDropdownOption, IDropdownStyles, PrimaryButton } from '@fluentui/react';
import { getCompanyRoles } from '../helpers/utils';
import { observable } from 'mobx';

const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 300 } };
var dropdowndata : IDropdownOption[] = [];

@observer
export default class Companyrole extends React.Component {
  @observable selectedCompany: any;
  public companyRoles: any;
  //@observable newcompanydata: ;
  public newcompanydata:IDropdownOption[];
  async componentDidMount() {
    try {
      this.companyRoles = await getCompanyRoles();
      this.newcompanydata  = this.companyRoles.map(x => {return{key:x.id,text:x.title}});
      Object.assign(dropdowndata, this.newcompanydata)
    } catch {

    }
  }

  private onSubmitClick(){
        console.log(this.selectedCompany);
  }

  private onChange(ev,item){
    console.log(item);
   //this.selectedCompany = item.selected ? [...this.selectedCompany, item.key] : this.selectedCompany.filter(key => key !== item.key);
  // console.log(this.selectedCompany)
  }

  public render() {
    return (
      <div className='mb10'>
        <input className='collapse-open' type='checkbox' id='collapse-3' />
        <label className='collapse-btn bgwhite' htmlFor='collapse-3'>
          <div className='fl fs22 dblock pr20 bold'>3</div>
          <div className='df fdc'>
            <span className='fs22 bold'>Catena-X Company Role</span>
            <div className='fs14 mt10'>You can choose different roles to participate in Catena-X. Don't worry, you can change it later again.</div>
          </div>
        </label>
        <div className='collapse-panel bgwhite'>
          <div className='p20'>
            <div className='pb20 p24'>
              <div className='fb pb6 df'>
                <Dropdown
                  placeholder="Select Participant Role"
                  label="Participant Role"
                  multiSelect
                  options={dropdowndata}
                  styles={dropdownStyles}
                  onChange={this.onChange}
                />
              </div>
              <div className='mr50 mt20 bgfe w100-100 df fdc'>
                <span className='fs18 bold mt20'>Role description and details</span>
                <span className='fs16 bold mt20'>Active Participant</span>
                <span className='fs14 mt20'>A network partner that provides and/or consumes business data (e.g. parts master data) and actively participates in at least one  use case.</span>
                <span className='fs14'>Examples : OEM, Supplier, KMU(SME) etc. We differentiate in two types: Self-Managed (e.g. own IdP) and Catena-X-Managed (e.g. IdP-Integration)  </span>
                <span className='fs16 bold mt20'>App Provider</span>
                <span className='fs14 mt20'>A network partner that provides Apps (or possible other software services) within the Ecosystem including pricing, billing, provisioning or similar.</span>
                <span className='fs16 bold mt20'>Operation and Infrastructure Provider</span>
                <span className='fs14 mt20'>A network partner that provides operations and/or Infrastructure services within the Catena-X network.</span>
              </div>

              <div className='ml30 pb8 mt50 p24 pb20 brbt df fdc fdrr'>
                   <PrimaryButton text='SUBMIT' onClick={()=>this.onSubmitClick()}/>
                </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

