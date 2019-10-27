import React from 'react';
import { PageHeader } from 'antd';

const articleHeader = (title, subTitle) => {
  return(
    <PageHeader
      className="articleHeader"
      onBack={() => window.history.back()}
      title={title}
      subTitle={subTitle}
    />
  );
}

export default articleHeader;