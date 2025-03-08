import { Layout as BasicLayout } from 'rspress/theme';
import { Content } from 'rspress/runtime';
import { HomeLayout } from './pages/index';
const Layout = () => <BasicLayout><Content /></BasicLayout>;


export {
    Layout,
    HomeLayout,
};

export * from 'rspress/theme';