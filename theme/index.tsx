import Theme from 'rspress/theme';
import { Content } from 'rspress/runtime';
import { HomeLayout } from './pages/index';
const Layout = () => <Theme.Layout ><Content /></Theme.Layout>;


export default {
    ...Theme,
    Layout,
    HomeLayout,
};

export * from 'rspress/theme';