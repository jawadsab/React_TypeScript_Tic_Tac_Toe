import React, { PropsWithChildren } from 'react';

type ScreenProps = {
  screenClassName?: string;
};

function Screen(props: PropsWithChildren<ScreenProps>) {
  return (
    <div className="home-container">
      <div className={`${props.screenClassName} screen`}>{props.children}</div>
    </div>
  );
}

export default Screen;
