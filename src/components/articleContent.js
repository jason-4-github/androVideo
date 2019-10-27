import React from 'react';
import { Card } from 'antd';
import ReactMarkdown from 'react-markdown';

const articleContent = (content) => {
  return(
    <Card style={{ width: "100%", overflowY: 'auto', height: '60vh' }}>
      { typeof content === 'object'
        ? content
        : <ReactMarkdown source={content} />
      }
    </Card>
  );
}

export default articleContent;