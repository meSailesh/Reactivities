import React, { SyntheticEvent } from 'react'
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
    deleteActivity: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
    submitting: boolean;
    target: string

}

export const ActivityDashboard: React.FC<IProps> = ({ activities,
    selectAcivity,
    selectedActivity,
    editMode,
    setEditMode,
    setSelectedActivity,
    createActivity,
    editActivity,
    deleteActivity,
    submitting,
    target
}) => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList
                    activities={activities}
                    selectAcivity={selectAcivity}
                    deleteActivity={deleteActivity}
                    submitting= {submitting}
                    target={target} />
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
                        editActivity={editActivity}
                        submitting= {submitting}  />
                }
            </Grid.Column>
        </Grid>
    )
}
