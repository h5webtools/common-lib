
/* eslint max-len:0 */
const cssText = `
  .md-navbar-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 99;
    transition: all .3s ease-in;
  }

  .md-navbar {
    display: flex;
    align-items: center;
    height: .88rem;
  }

  .md-status-bar {
    width: 100%;
    height: 20px;
  }

  .md-status-bar__iphonex {
    height: 44px;
  }

  .md-navbar-light {

  }

  .md-navbar-left {
    flex: 1;
    display: flex;
    align-items: center;
    margin-left: .3rem;
  }

  .md-navbar-left-icon {
    display: inline-block;
    width: .18rem;
    height: .3rem;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAeCAYAAAAhDE4sAAAAAXNSR0IArs4c6QAAAINJREFUSA1jYCAT/P//nwmEYdoZYQxSaKgB86F6EhkZGf+Roh+sFuqShUAaBkBsuMuIMhCkAYiRDYEZ1k2UASBFeAx5CJRTJMqgUUMwg2k0TAZzmADdRlpmw/QMqghVohtm5KhhxJc9o2EGTC1gMHjDjPjqCE9sguo5poGrstFcBi89AKU14Oo0Ck4xAAAAAElFTkSuQmCC);
    background-size: 100%;
    background-repeat: no-repeat;
  }

  .md-navbar-title {
    flex: 2;
    justify-content: center;
    font-family: PingFangSC-Semibold;
    font-size: .36rem;
    color: #fff;
    text-align: center;
  }

  .md-navbar-right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    margin-right: .3rem;
  }

  .md-navbar-right-link {
    font-size: .3rem;
    color: #fff;
    line-height: .34rem;
    text-decoration: none;
  }
`;

export default cssText;
