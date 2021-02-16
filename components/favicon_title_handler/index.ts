// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {ComponentProps} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {withRouter, RouteChildrenProps} from 'react-router-dom';

import {getCurrentChannel, getUnreads} from 'mattermost-redux/selectors/entities/channels';
import {getConfig} from 'mattermost-redux/selectors/entities/general';
import {getCurrentTeam} from 'mattermost-redux/selectors/entities/teams';
import {GlobalState} from 'mattermost-redux/types/store';
import {GenericAction} from 'mattermost-redux/types/actions';

import FaviconTitleHandler from './favicon_title_handler';

type Props = RouteChildrenProps;

function mapStateToProps(state: GlobalState, {match, location}: Props): ComponentProps<typeof FaviconTitleHandler> {
    const config = getConfig(state);
    const currentChannel = getCurrentChannel(state);
    const currentTeammate = (currentChannel && currentChannel.teammate_id) ? currentChannel : null;
    const currentTeam = getCurrentTeam(state);

    return {
        currentChannel,
        currentTeam,
        currentTeammate,
        siteName: config.SiteName,
        unreads: getUnreads(state),
        isGlobalThreadsView: match?.path === '/:team' && location?.pathname.includes(`${match?.url}/threads`),
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators({
        }, dispatch),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FaviconTitleHandler));
