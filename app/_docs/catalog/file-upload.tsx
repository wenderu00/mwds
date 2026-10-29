import { FileUpload } from "@/registry/marcio/ui/file-upload";
import { FormField } from "@/registry/marcio/ui/form-field";
import { FileUploadProgressDemo } from "../demos/file-upload-progress";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("file-upload"),
  usage: {
    use: ["Anexar arquivos num formulário, com limites claros de tipo e tamanho.", "Diga os limites no hint: tipo, tamanho e quantidade."],
    avoid: ["Trocar a foto de perfil com recorte: o componente não edita a imagem.", "Envio em segundo plano que continua depois de sair da página: o estado do envio vive no componente que faz o upload."],
  },
  props: [
    { name: "value / onValueChange", type: "File[] / (files) => void", description: "Uso controlado." },
    { name: "accept", type: "string", description: 'Mesmo formato do atributo nativo: ".pdf,image/*".' },
    { name: "acceptLabel", type: "string", description: 'Nome legível dos tipos, usado na mensagem de erro: "PDF ou imagem".' },
    { name: "maxSize", type: "number", description: "Tamanho máximo de cada arquivo, em bytes." },
    { name: "multiple / maxFiles", type: "boolean / number", default: "false / 1", description: "Vários arquivos e o limite. Sem multiple, o novo substitui o anterior." },
    { name: "onReject", type: "(rejections) => void", description: "Recebe os arquivos recusados, com motivo e mensagem." },
    { name: "title / hint", type: "ReactNode", description: "Texto principal da área e linha de apoio em mono." },
    { name: "removeLabel", type: "(file) => string", default: '"Remover <nome>"', description: "Nome do botão de remover." },
    { name: "fileStatus", type: "(file) => { progress?: number | null; error?: ReactNode; done?: boolean }", description: "Estado do envio de cada arquivo: barra de progresso (null é indeterminado), mensagem de erro ou enviado." },
    { name: "onRetry", type: "(file) => void", description: "Mostra o botão de enviar de novo nos arquivos com erro." },
    { name: "progressLabel / retryLabel", type: "(file) => string", default: '"Enviando <nome>" / "Enviar <nome> de novo"', description: "Nome da barra de progresso e do botão de nova tentativa." },
    { name: "doneLabel", type: "ReactNode", default: '"enviado"', description: "Texto ao lado do arquivo enviado." },
  ],
  examples: [
    {
      title: "Vários arquivos com limites",
      className: "w-full flex-col items-stretch",
      code: `<FormField label="Anexos">\n  <FileUpload\n    multiple\n    maxFiles={3}\n    maxSize={5 * 1024 * 1024}\n    accept=".pdf,image/*"\n    acceptLabel="PDF ou imagem"\n    hint="PDF ou imagem, até 5 MB cada, no máximo 3"\n  />\n</FormField>`,
      render: (theme) => (
        <FormField label="Anexos" id={`fu-a-${theme}`}>
          <FileUpload multiple maxFiles={3} maxSize={5 * 1024 * 1024} accept=".pdf,image/*" acceptLabel="PDF ou imagem" hint="PDF ou imagem, até 5 MB cada, no máximo 3" />
        </FormField>
      ),
    },
    {
      title: "Um arquivo",
      className: "w-full flex-col items-stretch",
      code: `<FormField label="Contrato assinado">\n  <FileUpload accept=".pdf" acceptLabel="PDF" hint="PDF até 10 MB" maxSize={10 * 1024 * 1024} />\n</FormField>`,
      render: (theme) => (
        <FormField label="Contrato assinado" id={`fu-b-${theme}`}>
          <FileUpload accept=".pdf" acceptLabel="PDF" hint="PDF até 10 MB" maxSize={10 * 1024 * 1024} />
        </FormField>
      ),
    },
    {
      title: "Progresso e erro de envio",
      description: "Quem faz o upload controla o estado de cada arquivo. Nesta demonstração o segundo arquivo falha em 60% na primeira tentativa.",
      className: "w-full flex-col items-stretch",
      code: `const [status, setStatus] = useState(new Map<File, FileUploadStatus>());\n\n<FileUpload\n  multiple\n  value={files}\n  onValueChange={(next) => { setFiles(next); next.forEach(enviar); }}\n  fileStatus={(file) => status.get(file)}\n  onRetry={enviar}\n/>\n\n// em enviar: { progress: 40 }, depois { done: true } ou { error: "A conexão caiu. Envie de novo." }`,
      render: (theme) => <FileUploadProgressDemo id={`fu-c-${theme}`} />,
    },
  ],
  a11y: [
    "A área inteira é o rótulo de um input de arquivo nativo, então funciona com clique, teclado e leitor de tela sem script extra.",
    "Arquivos recusados aparecem numa região role alert, com o nome do arquivo, o motivo e como resolver.",
    "Cada arquivo da lista tem um botão Remover com o nome do arquivo. Depois de remover, o foco volta para o campo.",
    "Arrastar não é a única forma: o texto da área sempre diz que dá para clicar.",
    "A barra de progresso de cada arquivo é um progressbar com o nome Enviando <nome>. O erro de envio aparece em role alert, ao lado do botão Enviar <nome> de novo.",
  ],
  keyboard: [
    { keys: "Tab", action: "Foca a área (contorno de foco nela inteira) e depois cada botão Remover." },
    { keys: "Enter / Espaço", action: "Na área, abre o seletor de arquivos do sistema. Num botão, remove o arquivo." },
  ],
};
