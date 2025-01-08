// @ts-nocheck

import { api } from '@/services/api';

export const getFiles = async (path: string): any[] => {
  const { userInfo } = useContext(UserContext);

  const SETOR = userInfo.unidade == 'rr' ? 'sabesp_rr' : 'sabesp_ra';

  return await api
    .get(`https://localsig.com/extratos/backend/files_api/list_files3.php?setor=${SETOR}&diretorio=${path}`)
    .then((resp: any) => {
      const files = [];

      for (const [pasta, arquivos] of Object.entries(resp.data)) {
        if (pasta === 'items') {
          for (let i = 0; i < arquivos.length; i++) {
            const file = {
              ...arquivos[i][0],
            };
            files.push(file);
          }
        } else {
          files.push({
            name: pasta,
            isDirectory: arquivos.isDirectory,
            size: arquivos.size,
            files: arquivos.items || [],
          });
        }
      }

      function sortFolders(a, b) {
        if (parseInt(a.name) < parseInt(b.name)) {
          return -1;
        }
        if (parseInt(a.name) > parseInt(b.name)) {
          return 1;
        }
        return 0;
      }

      return files.sort(sortFolders);
    })
    .catch((err) => {
      console.log(err);
    });
};
