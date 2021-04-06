import { useState } from 'react';
import { Avatar, Button } from 'antd';
import { useParams } from 'react-router-dom';
import { FORM_ERROR } from 'final-form';
import { useMutation } from '@apollo/client';
import { Layout } from 'components/Layout/Layout';
import { PagePlaceholder } from 'components/PagePlaceholder/PagePlaceholder';
import { IDParam } from 'utils/routes';
import { useEmployeeQuery } from './hooks/useEmployeeQuery';
import { EmployeeBreadcrumbs } from './components/EmployeeBreadcrumbs/EmployeeBreadcrumbs';
import { EmployeeInfo } from './components/EmployeeInfo/EmployeeInfo';
import { EmployeeForm } from './components/EmployeeForm/EmployeeForm';
import {
  EDIT_EMPLOYEE_DOCUMENT,
  EmployeeQuery,
  EditEmployeeMutationVariables,
} from './Employee.graphql';
import './Employee.css';

export const Employee = () => {
  const { id } = useParams<IDParam>();
  const emailParam = decodeURIComponent(id);
  const { data, error, loading } = useEmployeeQuery({
    variables: {
      email: emailParam,
    },
  });
  const [isEditMode, setEditMode] = useState(false);
  const [editEmployee] = useMutation<EmployeeQuery, EditEmployeeMutationVariables>(
    EDIT_EMPLOYEE_DOCUMENT
  );

  const toolbar = <EmployeeBreadcrumbs email={emailParam} />;

  if (loading || error || !data) {
    return (
      <PagePlaceholder toolbar={toolbar} isLoading={loading} isError={Boolean(error || !data)} />
    );
  }

  const handleEditModeEnable = () => {
    setEditMode(true);
  };

  const handleEditModeDisable = () => {
    setEditMode(false);
  };

  const handleSave = async (input: EditEmployeeMutationVariables['payload']) => {
    try {
      await editEmployee({
        variables: {
          email: emailParam,
          payload: input,
        },
      });
      setEditMode(false);
    } catch {
      return {
        [FORM_ERROR]: 'Failed to save changes, try again',
      };
    }
  };

  const {
    person,
    person: { picture },
  } = data;

  return (
    <Layout toolbar={toolbar}>
      <div className="employee">
        <Avatar size={64} src={picture?.large} className="employee__avatar" />
        <div className="employee__content">
          {isEditMode ? (
            <EmployeeForm
              employee={person}
              onSubmit={handleSave}
              onCancel={handleEditModeDisable}
            />
          ) : (
            <EmployeeInfo employee={person} />
          )}
        </div>
        <div>{!isEditMode && <Button onClick={handleEditModeEnable}>Edit</Button>}</div>
      </div>
    </Layout>
  );
};
