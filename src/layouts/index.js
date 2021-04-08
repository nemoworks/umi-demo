import { Layout, Menu} from 'antd';
import { Link } from 'umi';
import { AppstoreOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
function BasicLayout(props) {
  
  return (
  <Layout>
    <Header>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1"><Link to="/"><AppstoreOutlined/>index</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/employee"><UserOutlined/>employee</Link></Menu.Item>
        <Menu.Item key="3"><Link to="/list"><TeamOutlined/>list</Link></Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      {props.children}
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
  );
}

export default BasicLayout;
