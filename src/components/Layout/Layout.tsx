import { Layout as AntLayout } from 'antd';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ROUTE } from 'utils/routes';
import './Layout.css';

type LayoutProps = {
  children?: ReactNode;
  toolbar?: ReactNode
};

export const Layout = (props: LayoutProps) => {
  const { children, toolbar } = props;

  return (
    <AntLayout className="layout">
      <AntLayout.Header>
        <Link to={ROUTE.root} className="layout__header">
          Directory
        </Link>
      </AntLayout.Header>
      <AntLayout.Content>
        {toolbar && (
          <div className="layout__toolbar">{toolbar}</div>
        )}
        <div className="layout__content">{children}</div>
      </AntLayout.Content>
    </AntLayout>
  );
};
