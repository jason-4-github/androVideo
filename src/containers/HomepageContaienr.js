import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Layout } from 'antd';

import { loadMarkdownFile } from './../actions/index';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import aricleListPanel from './../components/articleListPanel';
import ArticleContainer from './ArticleContainer';

const { Header, Content } = Layout;

class HomepageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleCount: '',
    }
    const { loadMarkdownFile } = this.props;
    loadMarkdownFile();
  }
  render() {
    const { articles, articlesOutline } = this.props;
    return (
      <Layout className="layout">
        <Header id="homepage-header">
          <div className="logo" />
        </Header>
        <Content id="homepage-content">
          <Router>
            <Switch>
              <Route exact path="/">
                { aricleListPanel( articlesOutline ) }
              </Route>
              <Route exact path="/articles/:title">
                <ArticleContainer />
              </Route>
            </Switch>
          </Router>
        </Content>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.homepage,
  };
};

export default connect(
  mapStateToProps,
  { loadMarkdownFile }
)(HomepageContainer);
