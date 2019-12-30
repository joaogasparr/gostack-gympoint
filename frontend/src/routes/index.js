import React from 'react';
import { Switch } from 'react-router-dom';

import EnrollmentCreate from '~/pages/Enrollment/Create';
import EnrollmentList from '~/pages/Enrollment/List';
import HelpOrder from '~/pages/HelpOrder';
import PlanCreate from '~/pages/Plan/Create';
import PlanList from '~/pages/Plan/List';
import SignIn from '~/pages/SignIn';
import StudentCreate from '~/pages/Student/Create';
import StudentList from '~/pages/Student/List';

import Route from './Route';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/student" exact component={StudentList} isPrivate />
      <Route path="/student/create" component={StudentCreate} isPrivate />
      <Route path="/student/:id" component={StudentCreate} isPrivate />

      <Route path="/plan" exact component={PlanList} isPrivate />
      <Route path="/plan/create" component={PlanCreate} isPrivate />
      <Route path="/plan/:id" component={PlanCreate} isPrivate />

      <Route path="/enrollment" exact component={EnrollmentList} isPrivate />
      <Route path="/enrollment/create" component={EnrollmentCreate} isPrivate />
      <Route path="/enrollment/:id" component={EnrollmentCreate} isPrivate />

      <Route path="/helporder" component={HelpOrder} isPrivate />
    </Switch>
  );
}
