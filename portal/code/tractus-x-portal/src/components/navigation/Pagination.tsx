import { DefaultButton, IIconProps } from "@fluentui/react";
import { useEffect, useState } from "react";

export default function Pagination(props){
    const {pageNumber} = props;
  const ChevronLeft: IIconProps = { iconName: 'ChevronLeft' };
  const ChevronRight: IIconProps = { iconName: 'ChevronRight' };
  const [isDisabledBefore, setIsDisabledBefore] = useState<boolean | any>(false);

  useEffect(() => {
    setIsDisabledBefore(pageNumber === 0);
  }, [pageNumber, setIsDisabledBefore]);

  return(
    <div className="df jcc w100pc mt20">
      <DefaultButton iconProps={ChevronLeft} onClick={props.onPageBefore} disabled={isDisabledBefore}/>
      <span className="fs20 mr20 ml20 fg5a">page {pageNumber + 1}</span>
      <DefaultButton iconProps={ChevronRight} onClick={props.onPageNext} disabled={props.isDisabledNext}/>
    </div>
  )
}
