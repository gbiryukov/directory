import { ReactNode } from 'react';
import { Alert, Spin } from 'antd';
import { Layout } from 'components/Layout/Layout';
import './PagePlaceholder.css';

type PagePlaceholderProps = {
  toolbar: ReactNode;
  isLoading?: boolean;
  isError?: boolean;
};

export const PagePlaceholder = (props: PagePlaceholderProps) => {
  const { toolbar, isLoading, isError } = props;

  const renderContent = () => {
    if (isLoading) {
      return (
        <div role="progressbar" className="page-placeholder__loader">
          <Spin />
        </div>
      );
    }

    if (isError) {
      return (
        <Alert type="error" message="Oops something went wrong, please try to refresh the page" />
      );
    }

    throw new Error('`PagePlaceholder` should be either in error either in loading mode');
  };

  return <Layout toolbar={toolbar}>{renderContent()}</Layout>;
};
