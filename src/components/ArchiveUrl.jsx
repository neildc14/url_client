import React, { useState } from "react";
import { Card } from "@chakra-ui/react";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import copyToClipBoard from "../utils/copyToClipBoard";
import ViewFullLinkModal from "./ViewFullLinkModal";
import { patchRequest } from "../services/makeHTTPRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ArchiveButtons from "./ArchiveButtons";
import ArchiveOrginalURL from "./ArchiveOrginalURL";
import ArchiveShortenedURL from "./ArchiveShortenedURL";

const ArchiveUrl = ({ _id, original_link, shorten_link }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const shortened_link = `shrinky.onrender.com/li/${shorten_link}`;

  const queryClient = useQueryClient();

  const shareLink = useMutation({
    mutationFn: patchRequest,
    onSettled: () => {
      queryClient.invalidateQueries(["shorten_link"]);
    },
  });

  const shareLinkFunction = () => {
    shareLink.mutate({
      previous_shorten_link: `li/${shorten_link}`,
      body: { shared: true },
    });
  };

  const navigateToExternalLink = () => {
    window.location.href = original_link;
  };

  const editModalFunction = () => {
    setEditModal(!editModal);
  };

  const deleteModalFunction = () => {
    setDeleteModal(!deleteModal);
  };

  const viewFullLinkModalFunction = () => {
    setViewModal(!viewModal);
  };

  const copyURL = () => {
    const textToCopy = shortened_link;
    shareLinkFunction();
    copyToClipBoard(textToCopy);
  };

  return (
    <>
      <Card mb={4} px={2} pt={2} pb={4}>
        <ArchiveButtons
          copyURL={copyURL}
          editModalFunction={editModalFunction}
          deleteModalFunction={deleteModalFunction}
        />
        <ArchiveShortenedURL
          shortened_link={shortened_link}
          navigateToExternalLink={navigateToExternalLink}
        />
        <ArchiveOrginalURL
          original_link={original_link}
          viewFullLinkModalFunction={viewFullLinkModalFunction}
        />
      </Card>

      <DeleteModal
        id={_id}
        shorten_link={shorten_link}
        URL={shortened_link}
        deleteModal={deleteModal}
        deleteModalFunction={deleteModalFunction}
      />
      <EditModal
        shorten_link={shorten_link}
        URL={original_link}
        editModal={editModal}
        editModalFunction={editModalFunction}
      />
      <ViewFullLinkModal
        URL={original_link}
        viewModal={viewModal}
        viewFullLinkModalFunction={viewFullLinkModalFunction}
        copyURL={copyToClipBoard}
      />
    </>
  );
};

export default ArchiveUrl;
