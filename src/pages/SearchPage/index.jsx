import Layout from "../../components/Layout";
import { Search } from "./component";

export default function SearchPage() {
  return <Layout children={<Search />} type="search" />;
}
