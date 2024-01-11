import './App.css';
import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  HomeOutlined,
  PaperClipOutlined,
  PlusSquareOutlined,
  SnippetsOutlined,
  BarChartOutlined,
  CreditCardOutlined,
  RiseOutlined,
  PieChartOutlined,
  PicLeftOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, MenuProps } from 'antd';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Expense from './components/Expense';
import Categories from './components/Categories';
import BudgetGroups from './components/BudgetGroups';
import Revenue from './components/Revenue';
import CashFlow from './components/CashFlow';
import Report from './components/Report';
import LoginPage from './pages/LoginPage';
import { User } from './model/user';

const { Header, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userLogin, setUserLogin] = useState<User>();
  
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{height: '100vh'}}>
      {isLoggedIn ? 
      (<>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div style={{alignItems: 'center', display: 'flex', color: 'white', padding: '0px 24px 0px 24px'}}>
          <h1 style={{paddingLeft: 10, display: collapsed ? 'none' : 'block'}}>SmartFinTrack</h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={({key}) => {
            if(key === 'signout'){

            }else{
              navigate(key);
            }
          }}
          items={[
            getItem('Painel', '/', <BarChartOutlined />),
            getItem('Despesas', '/expense', <SnippetsOutlined />),
            getItem('Receitas', '/revenue', <RiseOutlined />),
            getItem('Fluxo de Caixa', '/cashFlow', <PieChartOutlined />),
            getItem('Relatórios', '/report', <PicLeftOutlined />),
            getItem('Cadastros', 'records', <PlusSquareOutlined/>,[
              getItem('Categorias', '/categories', <PaperClipOutlined />),
              getItem('Grupos de Orçamentos', '/budgetGroups', <CreditCardOutlined/>)
            ]),
            getItem('Sair', 'signout', <LogoutOutlined />)
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content userLoginId={userLogin?.id}></Content>
      </Layout>
      </>) :(<ContentLogin setIsLoggedIn={setIsLoggedIn} setUserLogin={setUserLogin}></ContentLogin>)}
    </Layout>
  );
};

type ContentProps = {
  userLoginId: number | undefined;
};

function Content({ userLoginId }: ContentProps) {
  console.log(userLoginId)
  const {
    token: { colorBgContainer },
  } = theme.useToken();

 return(
  <div 
    style={{
      margin: '24px 16px',
      padding: 24,
      minHeight: 280,
      background: colorBgContainer,
    }}
  >
    
    <Routes>
      <Route path='/' element={<Dashboard userLoginId={userLoginId}/>}></Route>
      <Route path='/expense' element={<Expense userLoginId={userLoginId}/>}></Route>
      <Route path='/revenue' element={<Revenue userLoginId={userLoginId}/>}></Route>
      <Route path='/cashFlow' element={<CashFlow userLoginId={userLoginId}/>}></Route>
      <Route path='/categories' element={<Categories userLoginId={userLoginId}/>}></Route>
      <Route path='/budgetGroups' element={<BudgetGroups userLoginId={userLoginId}/>}></Route>
      <Route path='/report' element={<Report userLoginId={userLoginId}/>}></Route>
      <Route path='/' element={<div/>}></Route>
    </Routes>

  </div>
 )
}

type SetIsLoggedInType = (isLoggedIn: boolean) => void;

type SetUserLoginType = (userLogin: User | undefined) => void;


type ContentLoginProps = {
  setIsLoggedIn: SetIsLoggedInType; // Use o tipo que você definiu
  setUserLogin: SetUserLoginType;
};

function ContentLogin({ setIsLoggedIn, setUserLogin }: ContentLoginProps) {
  return(
    <Routes>
      {/* Rota de login como página inicial quando o usuário não está logado */}
      <Route path="/" element={<LoginPage setIsLoggedIn={setIsLoggedIn} setUserLogin={setUserLogin} />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App;