const STICKER_URL = "https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/stickers/";

const $stickerList = $("#block_with_stikers");

$(document).on("click", ".delete_btn", onClick);
$stickerList.on("focusout", ".sticker_place", onFocus);
$("#add_btn_id").on("click", onFormSubmit);

let notesList = [];

function onClick(e) {
  e.stopPropagation();
  const id = $(this).closest(".block_stickers").data("id");
  deleteSticker(id);
}

function onFocus() {
  const id = $(this).closest(".block_stickers").data("id");
  updateNote(id, $(this));
}

init();

function init() {
  getStickers();
}

function getStickers() {
  return fetch(STICKER_URL)
    .then((res) => res.json())
    .then((data) => (notesList = data))
    .then(renderStickers);
}

function renderStickers(list) {
  $stickerList.html(
    list
      .map((stickers) => {
        return `<div data-id="${stickers.id}" class="block_stickers">
      <div class="delete_btn">&#10008</div>
      <textarea class="sticker_place" name="sticker" cols="30" rows="10">${stickers.description}</textarea>
    </div>`;
      })
      .join("")
  );
}

function onFormSubmit(e) {
  e.preventDefault();
  submitForm();
}

function submitForm() {
  const stickerObj = {
    description: "",
  };
  addSticker(stickerObj).then(getStickers);
}

function addSticker(sticker) {
  return fetch(STICKER_URL, {
    method: "POST",
    body: JSON.stringify(sticker),
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => console.error("Error occured in addSticker: ", error));
}
$(this);

function deleteSticker(id) {
  fetch(STICKER_URL + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(getStickers)
    .catch((error) => console.error("Error occured in deleteSticker: ", error));
}

function updateNote(id, el) {
  const stickerObj = {
    description: el.val(),
  };
  fetch(STICKER_URL + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(stickerObj),
  })
    .then(getStickers)
    .catch((error) => console.error("Error occured in updateNote: ", error));
}
