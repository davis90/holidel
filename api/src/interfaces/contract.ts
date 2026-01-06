interface ArticleContract {
    editable: boolean
    title: string
    content: string
    help: string
}

interface Contract {
    articles: ArticleContract[]
}