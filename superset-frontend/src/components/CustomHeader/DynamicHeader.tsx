import { useSelector, useDispatch } from 'react-redux';
import { Layout, Breadcrumb , Button } from "antd";
import { changeHeader } from './actions';


const DynamicHeader = function() {

    const dataFromState: any[] = useSelector((state: any) => state.changeHeaderReducer); // ดึง state ส่วน user
    const dispatch = useDispatch();
  

  
      return (
        <div>
          <Breadcrumb>
            {dataFromState.map( (item, index ) => {
              return (<Breadcrumb.Item key={index}>
                {item.label}
              </Breadcrumb.Item>
              );
            }) }
        </Breadcrumb>
        </div>
      );
}
export default DynamicHeader;