import React from 'react';
import {redirect} from '../../utils/redirect';

import Layout from '../../components/layout';
import API from '../../helpers/api';
import DashboardHeader from '../../components/dashboardHeader';
import PayoutSetup from '../../components/payoutSetup';
class Dashboard extends React.Component {
  constructor(props) {
    super();
  }

  static async getInitialProps(context) {
    let userProfile = await API.makeRequest('get', '/api/profile');
    let userPlatform = await API.makeRequest('get', '/api/profile/platform');

    return {
      profile: userProfile,
      platform: userPlatform,
      dashboardType: 'dashboard',
    };
  }

  componentDidMount() {
    // TODO: Move this to a server side check
    if (!this.props.isAuthenticated) {
      redirect('/login');
    }
  }

  render() {

    let hasPayoutSetup =
      this.props.platform &&
      this.props.platform.stripe != null &&
      this.props.platform.stripe.stripeUserId;
      
      
    return (
      <Layout
        isAuthenticated={this.props.isAuthenticated}
        userProfile={this.props.userProfile}
        title="Dashboard"
      >
        <div className="dashboard">
          <DashboardHeader
            profile={this.props.profile}
            dashboardType={this.props.dashboardType}
          />

        <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col-12">
                  <div className="clearfix">
                    <h4>Your overview</h4>
                  </div>
                </div>
              </div>
              <div className="row">
                {hasPayoutSetup ? (
                  <div />
          ) : (
              <div className="wrapper">
                <PayoutSetup />
            </div>
          )}
                </div>
              </div>
          </div>
        </div>


        <style jsx>{`
          .dashboard h4 {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 30px;
          }
          .wrapper {
            width: 100%;
            height: 400px;

            display: flex;
            justify-content: center;
            align-items: center;
        }          
        `}</style>
      </Layout>
    );
  }
}

export default Dashboard;
