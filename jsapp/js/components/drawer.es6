import React from 'react/addons';
import Reflux from 'reflux';
import {Link} from 'react-router';

import {dataInterface} from '../dataInterface';
import actions from '../actions';
import stores from '../stores';
import bem from '../bem';
import {
  t,
  assign,
} from '../utils';


var leaveBetaUrl = stores.pageState.leaveBetaUrl;

class DrawerTitle extends React.Component {
  render () {
    var kls = 'sidebar-title';
    if (this.props.separator) {
      kls += ' separator';
    }
    return (
        <li className={kls}>
          <span>{this.props.label}</span>
        </li>
      );
  }
}
class DrawerLink extends React.Component {
  onClick (evt) {
    if (!this.props.href) {
      evt.preventDefault();
    }
    if (this.props.onClick) {
      this.props.onClick(evt);
    }
  }

  render () {
    var icon_class = `ki ki-${this.props['ki-icon'] || 'globe'}`; 
    var icon = (<span className={icon_class}></span>);

    var link;
    if (this.props.linkto) {
      link = (
            <Link to={this.props.linkto}
                className='k-drawer__link'
                activeClassName='active'
                title={this.props.label}>
              {icon} 
              <span className="label">{this.props.label}</span>
            </Link>
            );
    } else {
      link = (
          <a href={this.props.href || '#'}
              className='k-drawer__link'
              onClick={this.onClick.bind(this)} title={this.props.label}>{icon} <span className="label">{this.props.label}</span></a>
        );
    }
    return link;
  }
}
var Drawer = React.createClass({
  mixins: [
    Reflux.connect(stores.session),
    Reflux.connect(stores.pageState),
  ],
  getInitialState () {
    return assign({
      showRecent: true,
    }, stores.pageState.state);
  },
  render () {
    return (
          <bem.Drawer className='mdl-layout__drawer mdl-shadow--2dp'>
            <nav className='k-drawer__icons'>
              <DrawerLink label={t('forms')} linkto='forms' ki-icon='forms' />
              <DrawerLink label={t('library')} linkto='library' ki-icon='library' />
              { stores.session.currentAccount ?
                  <DrawerLink label={t('projects')} active='true' href={stores.session.currentAccount.projects_url} ki-icon='globe' />
              : null }

              <div className="mdl-layout-spacer"></div>

              <div className='k-drawer__icons-bottom'>
                <DrawerLink label={t('source')} href='https://github.com/kobotoolbox/' ki-icon='github' />
                <DrawerLink label={t('help')} href='http://support.kobotoolbox.org/' ki-icon='help' />
              </div>
            </nav>
          </bem.Drawer>
      );
  }
});

export default Drawer;
