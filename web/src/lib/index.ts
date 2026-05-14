import DOMPurify from 'dompurify';
import { marked } from 'marked'

const encodeContent = (text: string): string => {
    const bytes = new TextEncoder().encode(text);
    const binString = Array.from(bytes, (byte) => String.fromCodePoint(byte)).join("");
    return btoa(binString);
}

const decodeContent = (encoded: string): string => {
    const binString = atob(encoded);
    const bytes = Uint8Array.from(binString, (char) => char.codePointAt(0)!);
    return new TextDecoder().decode(bytes);
}

export const getPostSlug = (content: string): string => {
    return encodeContent(content)
}

export const getPostContent = async (slug: string): Promise<string> => {
    let c = ""
    try {
        let decoded = decodeContent(slug)
        let html = await marked.parse(decoded)
        c = DOMPurify.sanitize(html);
    } catch (error) {
        c = "Post not found"
    }

    return c
}