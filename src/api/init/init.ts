import Http from "../../utils/http";

export async function getInitData() {
  return await Http.get('/api/init')
}