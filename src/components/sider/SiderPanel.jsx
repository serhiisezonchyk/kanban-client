import { Button, Divider, Form, Layout, Menu, theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React from 'react';
import { BiLogOut, BiChalkboard } from 'react-icons/bi';
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarRightCollapse,
} from 'react-icons/tb';
import Board from '../board/Board';
import { Content } from 'antd/es/layout/layout';
import styles from './SiderPanel.module.css';

function SiderPanel() {
  const [collapsed, setCollapsed] = React.useState(true);
  const [activeMenuItem, setActiveMenuItem] = React.useState('1');

  const contentClass = [styles.content];
  if (!collapsed) contentClass.push(styles.collapsed);

  const handleMenuClick = (e) => {
    setActiveMenuItem(e.key);
  };

  const handleLogoutClick = () => {
    // Modal.confirm({
    //   title: 'Повідомлення',
    //   content: 'Ви дійсно хочете вийти з облікового запису??',
    //   onOk: () => {
    //     dispatch(logout());
    //     localStorage.removeItem('token');
    //   },
    //   onCancel: () => {},
    // });
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className={styles.layout}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          backgroundColor: 'white',
          position: 'absolute',
          zIndex: 1,
          height: '100%',
        }}
      >
        <div className={styles.sider}>
          <div className={styles.sidermenu}>
            <p className={styles.logo}>Audit</p>
            <Menu
              mode='inline'
              defaultSelectedKeys={['1']}
              onClick={handleMenuClick}
              items={[
                {
                  key: '1',
                  icon: <BiChalkboard />,
                  label: 'Board',
                },
              ]}
            />
            <Divider />
            <Button
              onClick={handleLogoutClick}
              icon={<BiLogOut />}
              className={styles.logoutbutton}
              style={{ width: '-webkit-fill-available' }}
            >
              {!collapsed && 'Logout'}
            </Button>
          </div>

          <div className={styles.collapsediv}>
            <Button
              className={styles.collapsebutton}
              style={{ width: '-webkit-fill-available' }}
              type='text'
              icon={
                collapsed ? (
                  <TbLayoutSidebarRightCollapse />
                ) : (
                  <TbLayoutSidebarLeftCollapse />
                )
              }
              onClick={() => setCollapsed(!collapsed)}
            />
          </div>
        </div>
      </Sider>
      <div
        className={collapsed === false ? styles.layoutdivcollapsed : ''}
        style={{ backgroundColor: 'white' }}
        onClick={() => setCollapsed(true)}
      >
        <Layout
          style={{
            marginLeft: 80,
          }}
          // onClick={(e)=>e.stopPropagation()}
        >
          <Content
            className={contentClass.join(' ')}
            style={{ background: colorBgContainer }}
          >
            {activeMenuItem === '1' && <Board />}
          </Content>
        </Layout>
      </div>
    </Layout>
  );
}

export default SiderPanel;
