import React from "react";
import { Card, Row, Col, Button } from "antd";
import { UserOutlined, ShopOutlined, CarOutlined } from "@ant-design/icons";
import DynamicIcon from "src/components/DynamicIcon";
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { changeHeader } from 'src/components/CustomHeader/actions';

interface Insight {
  title: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

interface MyCustomPanelProps {
  dashboardData: object[] | null;
}

const insights: Insight[] = [
  {
    title: "Customer Insight",
    icon: <UserOutlined />,
    description:
      "กระบวนการทำความเข้าใจพฤติกรรม ความต้องการแรงจูงใจ และปัจจัยที่มีผลต่อการตัดสินใจของลูกค้า",
    color: "#FA8C16",
  },
  {
    title: "Business Insight",
    icon: <ShopOutlined />,
    description:
      "ข้อมูลที่ได้จากการวิเคราะห์ข้อมูลทางธุรกิจ ช่วยให้เห็นแนวโน้มโอกาส และความเสี่ยงในธุรกิจได้อย่างชัดเจน",
    color: "#1890FF",
  },
  {
    title: "Operation Insight",
    icon: <CarOutlined />,
    description:
      "ข้อมูลหรือความเข้าใจได้จากการวิเคราะห์กระบวนการและการดำเนินงานภายในองค์กร",
    color: "#722ED1",
  },
];

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f5f5f5",
  } as React.CSSProperties,
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  } as React.CSSProperties,
  header: {
    textAlign: "left",
    margin: 0,
    fontSize: "20px",
  } as React.CSSProperties,
  card: (borderColor: string): React.CSSProperties => ({
    borderRadius: "8px",
    padding: "16px",
    background: "#fff",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
    borderTop: `4px solid ${borderColor}`,
    position: "relative",
    height: "100%"
  }),
  cardHeader: {
    marginTop: "16px",
    color: "#333",
  } as React.CSSProperties,
  cardDescription: {
    margin: "10px 0 20px 0",
    color: "#666",
  } as React.CSSProperties,
  buttonRow: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "20px",
  } as React.CSSProperties,
  icon: (color: string): React.CSSProperties => ({
    fontSize: "24px",
    marginBottom: "8px",
    color: color,
  }),
};



const MyCustomPanel: React.FC<MyCustomPanelProps> = ({ dashboardData }) => {

  const dispatch = useDispatch();
  const callChangeHeaderByClick = function(title: string, url: string) {

   
    
    let data = [
      {
        label: <a href="/superset/welcome">Home</a>
      },
      {
        label: <a href="">Data Insight</a>,
      },
      {
        label: <a href={url} >{title}</a>,
      },
    ];
    console.log(data);
  
    dispatch( changeHeader(data));
  }


  const history = useHistory();

  // parser data
  let transformData: any[] = [];
  transformData = dashboardData?.map( function(obj: any) {
    
    let metaDataObj = JSON.parse(obj.json_metadata);
    console.log(metaDataObj);

    return {
      title: obj.dashboard_title,
      icon: metaDataObj?.global_chart_configuration?.customObj?.icon != undefined ? metaDataObj?.global_chart_configuration?.customObj?.icon: "Form" ,
      description: metaDataObj?.global_chart_configuration?.customObj?.description != undefined ? metaDataObj?.global_chart_configuration?.customObj?.description: "" ,
      color: metaDataObj?.global_chart_configuration?.customObj?.color != undefined ? metaDataObj?.global_chart_configuration?.customObj?.color: "#FA8C16" ,
      url : obj.url
    }
  });

  if (transformData == undefined) {
    transformData = [];
  }

  console.log(transformData);

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.headerRow}>
        <h2 style={styles.header}>Data Insight</h2>
        <Button type="link" style={{ fontSize: "16px" }}>
          ดูทั้งหมด
        </Button>
      </div>

      {/* Cards Section */}
      <Row gutter={[16, 24]} align="stretch">
        {transformData.map((insight, index) => (
          <Col span={8} key={index}>
            <Card style={styles.card(insight.color)}>
              <div style={styles.icon(insight.color)}>
                <DynamicIcon type="Form" ></DynamicIcon>
              </div>
              <h3 style={styles.cardHeader}>{insight.title}</h3>
              <p style={styles.cardDescription}>{insight.description}</p>
              <div style={styles.buttonRow}>
                <Button type="primary" ghost
                  onClick={() => {
                    history.push(insight.url);
                    callChangeHeaderByClick(insight.title, insight.url);
                  }
                }
                
                >
                  ดูข้อมูล
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MyCustomPanel;
