import { useMemo } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { tomorrow as theme } from "react-syntax-highlighter/dist/esm/styles/prism"
import { Label } from "@/components/ui/label"
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectGroup,
	SelectValue,
} from "@/components/ui/select"
import { API_VERSIONS } from "../data"
import CopyButton from "@/components/button-with-functions/CopyButton"

type ValuesType = {
	title?: string
	audioFile?: File | null
	language?: string
	token?: string
}

type CodeExampleProps = {
	values: ValuesType
	url: string
}

export const CodeExample: React.FC<CodeExampleProps> = ({ values, url }) => {
	const axiosCode = useMemo(() => {
		const audioFilePath = values.audioFile
			? `path/to/your/file/${values.audioFile.name ?? ""}`
			: "path/to/your/file/your_audio.wav"

		const formTitle = values.title
			? `formData.append('Title', '${values.title}');\n`
			: ""
		const formAudioFile = `formData.append('AudioFile', fs.createReadStream('${audioFilePath}'), { filename: '${
			values.audioFile ? values.audioFile.name : ""
		}', contentType: '${
			values.audioFile ? values.audioFile.type : ""
		}' });\n`
		const formLanguage = values.language
			? `formData.append('Language', '${values.language}');\n`
			: ""

		return `const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const formData = new FormData();
${formTitle}${formAudioFile}${formLanguage}
axios.post('${url}', formData, {
    headers: {
        'Authorization': 'Bearer ${values.token ?? ""}',
        'accept': '*/*',
        ...formData.getHeaders()
    }
})
.then(response => {
    console.log(JSON.stringify(response.data));
})
.catch(error => {
    console.error(error);
});`
	}, [values, url])

	const curlCode = useMemo(() => {
		return `curl -X 'POST' \\
  '${url}' \\
  -H 'accept: */*' \\
  -H 'Authorization: Bearer ${values.token ?? ""}' \\
  -H 'Content-Type: multipart/form-data' \\
  -F 'Title=${values.title ?? ""}' \\
  -F 'AudioFile=@${
		values.audioFile ? values.audioFile.name : ""
  };type=audio/wav' \\
  -F 'Language=${values.language}'`
	}, [values, url])

	return (
		<div className="flex flex-col items-end gap-2">
			<div className="min-w-[240px]">
				<Label>Versions</Label>
				<Select defaultValue={API_VERSIONS[0]}>
					<SelectTrigger>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							{API_VERSIONS.map((ver) => (
								<SelectItem key={ver} value={ver}>
									{ver}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>

			<div className="w-full">
				<div className="data-type">Example: axios</div>
				<div className="relative">
					<SyntaxHighlighter
						language="javascript"
						style={theme}
						showLineNumbers
					>
						{axiosCode}
					</SyntaxHighlighter>
					<CopyButton
						text={axiosCode}
						className="hover:bg-black hover:text-white active:text-white absolute top-0 right-0 text-white"
					/>
				</div>
			</div>

			<div className="w-full">
				<div className="data-type">Example: curl</div>
				<div className="relative">
					<SyntaxHighlighter
						language="bash"
						style={theme}
						showLineNumbers
					>
						{curlCode}
					</SyntaxHighlighter>
					<CopyButton
						text={curlCode}
						className="hover:bg-black hover:text-white active:text-white absolute top-0 right-0 text-white"
					/>
				</div>
			</div>
		</div>
	)
}
