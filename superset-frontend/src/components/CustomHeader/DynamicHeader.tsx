import { useSelector, useDispatch } from 'react-redux';
import { Layout, Breadcrumb , Button } from "antd";
import { changeHeader } from './actions';


const DynamicHeader = function() {

    const dataFromState: any[] = useSelector((state: any) => state.changeHeaderReducer); // ดึง state ส่วน user
    const dispatch = useDispatch();
  
    const testAdd = function() {
      let data = [
        {
          label: 'Home',
        },
        {
          label: <a href="">Application Center</a>,
        },
        {
          label: <a href="">Application List</a>,
        },
        {
          label: 'An Application',
        },
      ];
  
      dispatch( changeHeader(data));
    }
  
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
  
          <Button onClick = { testAdd } >
            Hello world
          </Button>
        </div>
      );
}
export default DynamicHeader;