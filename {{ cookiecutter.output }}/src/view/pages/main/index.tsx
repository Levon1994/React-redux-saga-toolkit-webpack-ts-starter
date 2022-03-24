import React from 'react';

import { useAppSelector } from '~/store/hooks';
import { Icon } from '~/view/components/icon';

export const MainPage: React.VFC = () => {
  const userEmail = useAppSelector(state => state.user.profile?.email);

  return (
    <div>
      <h1>Main page</h1>
      <hr />
      <h2>
        <b>Icons usage:</b>
      </h2>
      <div>
        <Icon name="example" width={50} height={50} />
      </div>
      <i>
        Prop <code>style</code> used for example, use className instead.
        <br />
        Also `Icon` inherits color from its parents.
      </i>
      <br />
      <code>
        {`<Icon name="circle-plus" width={50} height={50} className={styles['example-icon']} />`}
      </code>
      <hr />
      <br />
      {userEmail}
    </div>
  );
};
