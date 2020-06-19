import React from 'react';
import Link from 'next/link';
import NavProfile from './navProfile';

class PlatformNav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let className =
      'app ' + this.props.width && this.props.width == 'full'
        ? 'container-fluid nav-fullwidth'
        : 'container';

    return (
      <div className={className}>
        <nav className="navbar navbar-fixed navbar-expand-lg navbar-light">
          <ul className="navbar-nav mr-auto">
            <li className="navitem d-flex">
              <Link href="/">
                <a className="navbar-brand">
                  <div className="brand">
                    Mission <br /> Coffee <br />
                    Co.
                  </div>
                </a>
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav flex-row">
            <li className="navitem d-flex">
              <Link href="/wholesale">
                <a className="btn">Wholesale</a>
              </Link>
            </li>

            <li className="nav-item">
              <Link href="/about">
                <a className="btn">About</a>
              </Link>
            </li>
          </ul>

          <style jsx>{`
            :global(.nav-fullwidth) {
              padding-left: 50px;
            }

            .navbar {
              margin: 32px 0 32px 0;
              padding: 0;
              height: 45px;
            }

            .navbar-brand {
              display: flex;
              align-content: center;
            }

            .logo {
              align-self: center;
            }

            .brand {
              background: #7cbfbb;
              width: 60px;
              height: 60px;
              padding: 5px;

              word-wrap: break-word;
              color: #fff;
              font-size: 12px;
              line-height: 16px;
              font-weight: bold;
            }
          `}</style>
        </nav>
      </div>
    );
  }
}
export default PlatformNav;
