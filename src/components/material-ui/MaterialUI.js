/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
/* eslint-disable import/prefer-default-export */
import React, { lazy, Suspense } from 'react';

const Button = lazy(() =>
  import(/* webpackMode: "eager" */ '@material-ui/core/Button')
);
const Grid = lazy(() =>
  import(/* webpackMode: "eager" */ '@material-ui/core/Grid')
);

export const ButtonUI = (props) => {
  return (
    <Suspense fallback={<button className={props.className} />}>
      <Button {...props} />
    </Suspense>
  );
};
export const GridUI = (props) => {
  return (
    <Suspense
      fallback={<div className={props.className}>{props.children}</div>}
    >
      <Grid {...props} />
    </Suspense>
  );
};
