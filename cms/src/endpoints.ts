import type { Endpoint, PayloadRequest } from "payload";

function cleanerToBlock(block: Record<string, any>) {
    const { id, blockName, blockType, image, ...rest } = block;

    const clean: Record<string, any> = { type: blockType, ...rest };

    if (image && typeof image === 'object') {
        clean.image = { src: image.url, alt: image.alt }
    }

    return clean;
}

export const commonEndpoint: Endpoint = {
    path: '/common',
    method: 'get',
    handler: async (req: PayloadRequest) => {
        const common = await req.payload.findGlobal({ slug: 'common', depth: 1 })

        return Response.json({
            siteName: common.siteName,
            menu: (common.menu ?? []).map(({ label, link }: any) => ({ label, link })),
            footer: { text: common.footer?.text ?? '' }
        })
    }
}

export const pageEndpoint: Endpoint = {

    path: '/page',
    method: 'get',
    handler: async (req: PayloadRequest) => {

        const path = req.query.path

        const result = await req.payload.find({
            collection: 'pages',
            where: { path: { equals: path } },
            depth: 2,
            limit: 1
        })

        const page = result.docs[0];

        if (!page){
            return Response.json({error: 'Сторінку не знайдено'}, {status:404} )
        }

        return Response.json({
            path: page.path,
            title: page.title,
            blocks: (page.blocks ?? []).map(cleanerToBlock)
        })
    }
}