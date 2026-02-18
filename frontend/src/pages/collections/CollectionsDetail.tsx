import {Link} from "react-router-dom";
import {useParams} from "react-router";
import {useQuery} from "@tanstack/react-query";
import apiClient from "../../components/commons/apiClient";
import {Fragment} from "react";
import Commentor from "../../components/commons/Commentor";

interface CollectionsDetailProps {
    id: string;
    nameKr: string;
    museumName: string;
    materialName: string;
    nationalityName: string;
    imgThumbM: string;
    description: string;
}

export default function CollectionDetail() {
    const {id} = useParams<string>();

    const {data, error, isError, isLoading} = useQuery({
        queryKey: ['collections-detail', id],
        queryFn: async () => {
            return await apiClient.get(`/collections/springDetail/${id}`);
        }
    });

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (isError) {
        console.log(error);
        return <h1>Error...</h1>;
    }

    if (!data) {
        return null;
    }

    const collection:CollectionsDetailProps = data.data;

    return (
        <Fragment>
            <div className="collections-detail-container">
                <div className="collections-detail-card">
                    <div className="collections-detail-image-box">
                        <img src={collection.imgThumbM} alt={collection.nameKr} />
                    </div>

                    <div className="collections-detail-info">
                        <h1 className="collections-detail-title">{collection.nameKr}</h1>

                        <ul className="collections-detail-meta">
                            <li><b>박물관</b> {collection.museumName}</li>
                            <li><b>재질</b> {collection.materialName}</li>
                            <li><b>국적</b> {collection.nationalityName}</li>
                            <li><b>ID</b> {collection.id}</li>
                        </ul>

                        <p className="collections-detail-desc">
                            {collection.description || "설명 정보가 없습니다."}
                        </p>

                        <div className="collections-detail-actions">
                            <Link to="/collections" className="collections-detail-btn collections-detail-list-btn">
                                목록
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Commentor targetType={"collections"} targetNo={collection.id} />
        </Fragment>
    );
}