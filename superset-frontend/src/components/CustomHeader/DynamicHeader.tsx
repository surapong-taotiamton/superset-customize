import { useSelector, useDispatch } from 'react-redux';
import { Layout, Breadcrumb , Button } from "antd";
import { changeHeader } from './actions';
import { Link, useHistory } from 'react-router-dom';

const DynamicHeader = function() {

    const history = useHistory();
    const dataFromState: any[] = useSelector((state: any) => state.changeHeaderReducer); // ดึง state ส่วน user
    const dispatch = useDispatch();
    
    const changePage = function() {
      history.push("/superset/dynamic/test-view");
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
        <Button onClick={changePage} >
          TEST
        </Button>
        </div>
      );
}
export default DynamicHeader;