
import { css } from 'react-emotion';

export default {
  GridRow: css`
    position: relative;
    display: flex;
    flex-direction: row;

    .cell,
    .headerCell,
    .leftCell {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 0 .5em;
    }
    .headerCell,
    .leftCell {
      font-weight: bold;
    }
  `,
  GridColumn: css`
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
  `,
  LeftSideGridContainer: css`
    flex: 0 0 75px;
    z-index: 10;
  `,

  LeftSideGrid: css`
    overflow: hidden !important;
  `,
  HeaderGrid: css`
    width: 100%;
    overflow: hidden !important;
  `,
  BodyGrid: css`
    width: 100%;
  `,

  evenRow: css`
  `,
  oddRow: css`
    background-color: rgba(0, 0, 0, .1);
  `,
};
