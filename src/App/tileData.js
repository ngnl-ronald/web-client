// This file is shared across the demos.
import { history } from "../_helpers";
import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Icon from 'material-ui/Icon'
import InboxIcon from 'material-ui-icons/MoveToInbox';


export const mailFolderListItems = (
  <div>
    <ListItem button onClick={() => history.push('/register')}>
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary="Register" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary="Starred" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary="Send mail" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary="Drafts" />
    </ListItem>
  </div>
);

export const otherMailFolderListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary="All mail" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary="Trash" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary="Spam" />
    </ListItem>
  </div>
);