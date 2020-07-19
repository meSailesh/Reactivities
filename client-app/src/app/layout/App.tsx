import React, { useState, useEffect, Fragment, SyntheticEvent } from 'react';
import { Container } from 'semantic-ui-react'
import { IActivity } from '../models/activity';
import { NavBar } from '../../features/nav/NavBar';
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import { LoadingComponent } from './LoadingComponent';



const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedAcitivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');

  const handleSelectActivity = (id: string) => {
    setSelectedAcitivity(activities.filter(a => a.id === id)[0]);
    setEditMode(false)
  };


  const handleOpenCreateForm = () => {
    setSelectedAcitivity(null);
    setEditMode(true)
  }

  const handleCreateActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.create(activity).then(() => {
      setActivities([...activities, activity])
      setSelectedAcitivity(activity);
      setEditMode(false);
    }).then(() => setSubmitting(false))
  }

  const handleEditActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.update(activity).then(() => {
      setActivities([...activities.filter(a => a.id !== activity.id), activity])
      setSelectedAcitivity(activity)
      setEditMode(false)
    }).then(() => setSubmitting(false))
  }

  const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);

    agent.Activities.delete(id).then(() => {
    setActivities([...activities.filter(a => a.id !== id)])
    if (selectedActivity && selectedActivity.id === id) {
      setSelectedAcitivity(null);
    }
   }).then(() => setSubmitting(false))
  }

  useEffect(() => {
    agent.Activities.list()
      .then(response => {
        let activites: IActivity[] = [];
        response.forEach((activity) => {
          activity.date = activity.date.split('.')[0]
          activites.push(activity);
        })
        setActivities(activites)
      }).then(() => setLoading(false));
  }, []);

  if(loading) return <LoadingComponent content = 'Loading activities...' />

  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectAcivity={handleSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedAcitivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
          target={target}
        />
      </Container>
    </Fragment>
  );
}


export default App;
