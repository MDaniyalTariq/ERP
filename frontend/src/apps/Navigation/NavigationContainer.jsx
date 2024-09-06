import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Drawer, Layout, Menu } from 'antd';

import { useAppContext } from '@/context/appContext';

import useLanguage from '@/locale/useLanguage';
import logoIcon from '@/style/images/logo-icon.svg';
import logoText from '@/style/images/logo-text.svg';

import useResponsive from '@/hooks/useResponsive';

import {
  SettingOutlined,
  CustomerServiceOutlined,
  ContainerOutlined,
  FileSyncOutlined,
  DashboardOutlined,
  TagOutlined,
  TagsOutlined,
  UserOutlined,
  CreditCardOutlined,
  MenuOutlined,
  FileOutlined,
  ShopOutlined,
  FilterOutlined,
  WalletOutlined,
  TeamOutlined,
  ReconciliationOutlined,
  BuildOutlined, // Added for Supplier management
  GlobalOutlined, // Added for Logistics
  AreaChartOutlined,
} from '@ant-design/icons';

import { useSelector } from 'react-redux';
import { selectLangDirection } from '@/redux/translate/selectors';

const { Sider } = Layout;

export default function Navigation() {
  const { isMobile } = useResponsive();

  return isMobile ? <MobileSidebar /> : <Sidebar collapsible={false} />;
}

function Sidebar({ collapsible, isMobile = false }) {
  let location = useLocation();

  const { state: stateApp, appContextAction } = useAppContext();
  const { isNavMenuClose } = stateApp;
  const { navMenu } = appContextAction;
  const [showLogoApp, setLogoApp] = useState(isNavMenuClose);
  const [currentPath, setCurrentPath] = useState(location.pathname.slice(1));

  const translate = useLanguage();
  const navigate = useNavigate();

  const items = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: <Link to={'/'}>{translate('dashboard')}</Link>,
    },
    // CRM Modules
    {
      key: 'customer',
      icon: <CustomerServiceOutlined />,
      label: <Link to={'/customer'}>{translate('customers')}</Link>,
    },
    {
      key: 'lead',
      icon: <FilterOutlined />,
      label: <Link to={'/lead'}>{translate('leads')}</Link>,
    },
    {
      key: 'offer',
      icon: <FileOutlined />,
      label: <Link to={'/offer'}>{translate('offers')}</Link>,
    },
    {
      key: 'invoice',
      icon: <ContainerOutlined />,
      label: <Link to={'/invoice'}>{translate('invoices')}</Link>,
    },
    {
      key: 'quote',
      icon: <FileSyncOutlined />,
      label: <Link to={'/quote'}>{translate('quotes')}</Link>,
    },
    {
      key: 'payment',
      icon: <CreditCardOutlined />,
      label: <Link to={'/payment'}>{translate('payments')}</Link>,
    },

    // Financial Management
    {
      key: 'expenses',
      icon: <WalletOutlined />,
      label: <Link to={'/expenses'}>{translate('expenses')}</Link>,
    },
    {
      key: 'expensesCategory',
      icon: <ReconciliationOutlined />,
      label: <Link to={'/category/expenses'}>{translate('expenses_category')}</Link>,
    },
    {
      key: 'taxes',
      icon: <ReconciliationOutlined />,
      label: <Link to={'/taxes'}>{translate('taxes')}</Link>,
    },

    // Inventory Management
    {
      key: 'product',
      icon: <TagOutlined />,
      label: <Link to={'/product'}>{translate('products')}</Link>,
    },
    {
      key: 'categoryproduct',
      icon: <TagsOutlined />,
      label: <Link to={'/category/product'}>{translate('product_categories')}</Link>,
    },

    // Human Resources
    {
      key: 'employee',
      icon: <UserOutlined />,
      label: <Link to={'/employee'}>{translate('employees')}</Link>,
    },

    // Purchase and Sales
    {
      key: 'purchaseOrder',
      icon: <FileSyncOutlined />,
      label: <Link to={'/purchase-order'}>{translate('purchase_orders')}</Link>,
    },
    {
      key: 'salesOrder',
      icon: <FileSyncOutlined />,
      label: <Link to={'/sales-order'}>{translate('sales_orders')}</Link>,
    },

    // Supply Chain Management
    {
      key: 'supplier',
      icon: <BuildOutlined />,
      label: <Link to={'/supplier'}>{translate('suppliers')}</Link>,
    },
    {
      key: 'inventory',
      icon: <ContainerOutlined />,
      label: <Link to={'/inventory'}>{translate('inventory')}</Link>,
    },
    {
      key: 'logistics',
      icon: <GlobalOutlined />,
      label: <Link to={'/logistics'}>{translate('logistics')}</Link>,
    },
    {
      key: 'purchaseRequest',
      icon: <FileOutlined />,
      label: <Link to={'/purchase-request'}>{translate('purchase_requests')}</Link>,
    },
    {
      key: 'reports',
      icon: <AreaChartOutlined />,
      label: <Link to={'/reports'}>{translate('reports')}</Link>,
    },

    // Settings
    {
      label: translate('settings'),
      key: 'settings',
      icon: <SettingOutlined />,
      children: [
        {
          key: 'admin',
          label: <Link to={'/admin'}>{translate('admin')}</Link>,
        },
        {
          key: 'branch',
          label: <Link to={'/branch'}>{translate('branch')}</Link>,
        },
        {
          key: 'generalSettings',
          label: <Link to={'/settings'}>{translate('general_settings')}</Link>,
        },
        {
          key: 'emailTemplates',
          label: <Link to={'/email'}>{translate('email_templates')}</Link>,
        },
        {
          key: 'paymentMode',
          label: <Link to={'/payment/mode'}>{translate('payment_modes')}</Link>,
        },
        {
          key: 'taxes',
          label: <Link to={'/taxes'}>{translate('taxes')}</Link>,
        },
        {
          key: 'about',
          label: <Link to={'/about'}>{translate('about')}</Link>,
        },
        {
          key: 'advancedSettings',
          label: <Link to={'/settings/advanced'}>{translate('advanced_settings')}</Link>,
        },
      ],
    },
  ];

  useEffect(() => {
    if (location)
      if (currentPath !== location.pathname) {
        if (location.pathname === '/') {
          setCurrentPath('dashboard');
        } else setCurrentPath(location.pathname.slice(1));
      }
  }, [location, currentPath]);

  useEffect(() => {
    if (isNavMenuClose) {
      setLogoApp(isNavMenuClose);
    }
    const timer = setTimeout(() => {
      if (!isNavMenuClose) {
        setLogoApp(isNavMenuClose);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [isNavMenuClose]);
  const onCollapse = () => {
    navMenu.collapse();
  };

  const langDirection = useSelector(selectLangDirection);
  return (
    <Sider
      collapsible={collapsible}
      collapsed={collapsible ? isNavMenuClose : collapsible}
      onCollapse={onCollapse}
      className="navigation"
      width={256}
      style={{
        overflow: 'auto',
        height: '100vh',
        direction: langDirection,
        position: isMobile ? 'absolute' : 'relative',
        bottom: '20px',
        ...(!isMobile && {
          background: 'none',
          border: 'none',
          [langDirection === 'rtl' ? 'right' : 'left']: '20px',
          top: '20px',
          borderRadius: '8px',
        }),
      }}
      theme={'light'}
    >
      <div
        className="logo"
        onClick={() => navigate('/')}
        style={{
          cursor: 'pointer',
        }}
      >
        <img src={logoIcon} alt="Logo" style={{ marginLeft: '-5px', height: '40px' }} />

        {!showLogoApp && (
          <img
            src={logoText}
            alt="Logo"
            style={{
              marginTop: '3px',
              marginLeft: '10px',
              height: '38px',
            }}
          />
        )}
      </div>
      <Menu
        items={items}
        mode="inline"
        theme={'light'}
        selectedKeys={[currentPath]}
        style={{
          background: 'none',
          border: 'none',
          width: 256,
        }}
      />
    </Sider>
  );
}

function MobileSidebar() {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const langDirection = useSelector(selectLangDirection);
  return (
    <>
      <Button
        type="text"
        size="large"
        onClick={showDrawer}
        className="mobile-sidebar-btn"
        style={{ [langDirection === 'rtl' ? 'marginRight' : 'marginLeft']: 25 }}
      >
        <MenuOutlined style={{ fontSize: 18 }} />
      </Button>
      <Drawer
        width={250}
        contentWrapperStyle={{
          boxShadow: 'none',
        }}
        style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}
        placement={langDirection === 'rtl' ? 'right' : 'left'}
        closable={false}
        onClose={onClose}
        open={visible}
      >
        <Sidebar collapsible={false} isMobile={true} />
      </Drawer>
    </>
  );
}
