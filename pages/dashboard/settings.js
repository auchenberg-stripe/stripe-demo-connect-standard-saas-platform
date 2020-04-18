import React from 'react';
import {redirect} from '../../utils/redirect';

import Layout from '../../components/layout';
import API from '../../helpers/api';
import DashboardPlatformSettings from '../../components/dashboardPlatformSettings';
import DashboardHeader from '../../components/dashboardHeader';


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
      dashboardType: 'settings',
    };
  }

  disconnectStripeAccount = async () => {
    await API.makeRequest('post', '/api/profile/disconnect_stripe');
    redirect('/dashboard/settings');
  };  

  componentDidMount() {
    // TODO: Move this to a server side check
    if (!this.props.isAuthenticated) {
      redirect('/login');
    }
  }

  render() {
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
            <div className="col-6">
              <div className="row">
                <div className="col-8">
                  <div className="clearfix">
                    <h3>Settings</h3>
                  </div>
                </div>
              </div>

              <h4>Platform</h4>
              <DashboardPlatformSettings platform={this.props.platform} />

              {this.props.platform.stripe && (
            <>
            <h4>Stripe</h4>
              <button type="submit" className="btn-submit btn btn-secondary" onClick={this.disconnectStripeAccount}>
              Disconnect Stripe account
            </button>
            </>
          )}



            </div>
          </div>
        </div>
        <style jsx>{`
          .dashboard h4 {
            font-size: 20px;
            margin-top: 30px;
            margin-bottom: 30px;
          }
        `}</style>
      </Layout>
    );
  }
}

export default Dashboard;