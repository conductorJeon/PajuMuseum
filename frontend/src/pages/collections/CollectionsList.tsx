import {useQuery} from "@tanstack/react-query";
import {AxiosResponse} from "axios";
import {Fragment, useState} from "react";
import apiClient from "../../components/commons/apiClient";
import {Link} from "react-router-dom";
import Paginator from "../../components/commons/Paginator";

interface CollectionsProps {
    museumName: string;
    materialName: string;
    nationalityName: string;
    sizeInfo: string;
    imgThumbM: string;
    nameKr: string;
    id: string;
}

interface CollectionsResponseProps {
    startPage: number;
    endPage: number;
    totalPages: number;
    currentPage: number;
    list: CollectionsProps[];
}

export default function CollectionsList() {
    const [currentPage, setCurrentPage] = useState(1);

    const {data, error, isError, isLoading} = useQuery<AxiosResponse<CollectionsResponseProps>>({
        queryKey: ['board-list', currentPage],
        queryFn: async () => await apiClient.get(`/collections/springList/${currentPage}`)
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        console.error(error);
        return <div>Error...</div>;
    }

    if (!data) {
        return null;
    }

    const collections: CollectionsProps[] = data.data.list;

    return (
        <Fragment>
            <div className="collection-grid">
                {
                    collections.map((collection, i) =>
                        <div className="collection-card" key={i}>
                            <Link to={'/collections/detail/' + collection.id}>
                                <img src={collection.imgThumbM}/>
                                <h3>{collection.nameKr}</h3>
                            </Link>
                        </div>
                    )
                }
            </div>
            <Paginator data={data.data} setCurrentPage={setCurrentPage} />
        </Fragment>
    )
}