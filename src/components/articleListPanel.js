import React from 'react';
import { Collapse } from 'antd';
import _ from 'lodash';
import ReactMarkdown from 'react-markdown';
import { Link } from "react-router-dom";

const { Panel } = Collapse;

const articleListPanel = (articlesOutline) => {
  if(!articlesOutline) return;
  const results = [];
  let articleCount = 0;
  _.map(articlesOutline, (value, key) => {
    articleCount += 1;
    const panelTitle = <h2> Title: <b> {key} </b> </h2>;
    results.push(
      <Panel header={panelTitle} key={articleCount} showArrow={false}>
        <ReactMarkdown source={value} />
        <Link to={`/articles/${key}`} className="readMoreLink">read more</Link>
        <br />
      </Panel>
    )
  });

  return (
    <Collapse accordion defaultActiveKey={1}>
      { results }
    </Collapse>
  )}

export default articleListPanel;