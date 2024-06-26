import docx
from pdfminer.high_level import extract_text
import sys

def parse_resume(file_path):
    try:
        if file_path.endswith('.pdf'):
            text = extract_text(file_path)
        elif file_path.endswith('.docx'):
            doc = docx.Document(file_path)
            text = '\n'.join([paragraph.text for paragraph in doc.paragraphs])
        else:
            raise ValueError("Unsupported file format. Only PDF and DOCX files are supported.")
        
        # Decode text if it's a byte string
        text = text.decode('utf-8') if isinstance(text, bytes) else text
        
        # Perform resume parsing logic here

        # For demonstration, let's just return the extracted text
        return text
    except Exception as e:
        print(f"Error parsing resume: {e}", file=sys.stderr)
        return None

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python resumeParser.py <file_path>")
        sys.exit(1)

    file_path = sys.argv[1]
    parsed_text = parse_resume(file_path)
    if parsed_text is not None:
        try:
            # Write the text to a file
            with open('parsed_resume.txt', 'w', encoding='utf-8') as f:
                f.write(parsed_text)
            print("Resume text has been written to parsed_resume.txt")
        except Exception as e:
            print(f"Error writing parsed text to file: {e}", file=sys.stderr)
