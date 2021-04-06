import { useState } from 'react';
import { Avatar, Button, Alert, Spin } from 'antd';
import { useParams } from 'react-router-dom';
import { FORM_ERROR } from 'final-form';
import { useMutation } from '@apollo/client';
import { Layout } from 'components/Layout/Layout';
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

  if (loading || error || !data) {
    return (
      <Layout toolbar={<EmployeeBreadcrumbs email={emailParam} />}>
        {loading ? (
          <div role="progressbar" className="employee__loader">
            <Spin />
          </div>
        ) : (
          <Alert type="error" message="Oops something went wrong, please try to refresh the page" />
        )}
      </Layout>
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
    <Layout toolbar={<EmployeeBreadcrumbs email={emailParam} />}>
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
