import React from 'react'
import { Grid } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import { ActivityList } from './ActivityList'
import { ActivityDetails } from '../Details/ActivityDetails'
import { ActivityForm } from '../form/ActivityForm'

interface IProps {
    activities: IActivity[];
    selectAcivity: (id: string) => void;
    selectedActivity: IActivity | null;
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
    setSelectedActivity: (activity: IActivity | null) => void;
    createActivity: (activity: IActivity) => void;
    editActivity: (activity: IActivity) => void;
    deleteActivity: (id: string) => void;

}

export const ActivityDashboard: React.FC<IProps> = ({ activities,
    selectAcivity,
    selectedActivity,
    editMode,
    setEditMode,
    setSelectedActivity,
    createActivity,
    editActivity,
    deleteActivity
}) => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList
                    activities={activities}
                    selectAcivity={selectAcivity}
                    deleteActivity={deleteActivity} />
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedActivity && !editMode &&
                    <ActivityDetails
                        activity={selectedActivity}
                        setEditMode={setEditMode}
                        setSelectedAcitivity={setSelectedActivity} />}
                {editMode &&
                    <ActivityForm
                        key={(selectedActivity && selectedActivity.id) || 0}
                        setEditMode={setEditMode}
                        activity={selectedActivity}
                        createActvity={createActivity}
                        editActivity={editActivity} />
                }
            </Grid.Column>
        </Grid>
    )
}
