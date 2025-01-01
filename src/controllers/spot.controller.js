import { HTTP_STATUS } from '../constants/http-status.constant.js';
import SpotService from '../services/spot.service.js';

class SpotController {
  spotService = new SpotService();
  // 명소 등록
  setSpot = async (req, res, next) => {
    try {
      const imageUrl = req.files[0].location;
      const { spotName, region } = req.body;
      console.log(imageUrl);
      const setSpot = await this.spotService.setSpot(
        spotName,
        region,
        imageUrl,
      );
      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: '명소 등록 성공',
        data: setSpot,
      });
    } catch (error) {
      next(error);
    }
  };

  //전체 명소 조회
  getAllSpot = async (req, res, next) => {
    try {
      const { region } = req.body;
      const getAllSpot = await this.spotService.getAllSpot(region);
      console.log(getAllSpot);
      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: '전체 명소 조회 성공',
        data: getAllSpot,
      });
    } catch (error) {
      next(error);
    }
  };

  //상세 명소 조회
  getOneSpot = async (req, res, next) => {
    try {
      const { spotId } = req.params;
      const getOneSpot = await this.spotService.getOneSpot(+spotId);
      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: '상세 명소 조회 성공',
        data: getOneSpot,
      });
    } catch (error) {
      next(error);
    }
  };

  // 명소 삭제
  deleteSpot = async (req, res, next) => {
    try {
      const { spotId } = req.params;
      const deleteSpot = await this.spotService.deleteSpot(+spotId);
      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: '명소 삭제 성공',
        data: deleteSpot,
      });
    } catch (error) {
      next(error);
    }
  };

  // 명소 북마크 등록
  setBookmark = async (req, res, next) => {
    try {
      const { spotId } = req.params;
      const user = req.user;
      const setBookmark = await this.spotService.setBookmark(
        +spotId,
        user.userId,
      );
      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: '명소 북마크 등록 성공',
        data: setBookmark,
      });
    } catch (error) {
      next(error);
    }
  };

  // 명소 북마크 조회
  getBookmark = async (req, res, next) => {
    try {
      const user = req.user;
      const getBookmark = await this.spotService.getBookmark(user.userId);
      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: '명소 북마크 조회 성공',
        data: getBookmark,
      });
    } catch (error) {
      next(error);
    }
  };

  // 명소 북마크 삭제
  deleteBookmark = async (req, res, next) => {
    try {
      const { spotId } = req.params;
      const user = req.user;
      const deleteBookmark = await this.spotService.deleteBookmark(
        +spotId,
        user.userId,
      );
      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: '명소 북마크 삭제 성공',
      });
    } catch (error) {
      next(error);
    }
  };

  // 명소 좋아요 등록
  setLike = async (req, res, next) => {
    try {
      const { spotId } = req.params;
      const user = req.user;
      const setLike = await this.spotService.setLike(+spotId, user.userId);
      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: '명소 좋아요 등록 성공',
        data: setLike,
      });
    } catch (error) {
      next(error);
    }
  };

  // 명소 좋아요 삭제
  deleteLike = async (req, res, next) => {
    try {
      const { spotId } = req.params;
      const user = req.user;
      const deleteLike = await this.spotService.deleteLike(
        +spotId,
        user.userId,
      );
      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: '명소 좋아요 삭제 성공',
      });
    } catch (error) {
      next(error);
    }
  };

  // 명소 리뷰 등록
  setReview = async (req, res, next) => {
    try {
      const { rate, content } = req.body;
      const { spotId } = req.params;
      const user = req.user;
      const setReview = await this.spotService.setReview(
        +spotId,
        user.userId,
        rate,
        content,
      );
      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: '명소 리뷰 등록 성공',
        data: setReview,
      });
    } catch (error) {
      next(error);
    }
  };

  // 명소 리뷰 전체 조회
  getAllReview = async (req, res, next) => {
    try {
      const { spotId } = req.params;
      const getAllReview = await this.spotService.getAllReview(+spotId);
      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: '명소 전체 리뷰 조회 성공',
        data: getAllReview,
      });
    } catch (error) {
      next(error);
    }
  };

  // 명소 리뷰 상세 조회
  getOneReview = async (req, res, next) => {
    try {
      const userId = req.user.userId;
      const { spotId, reviewId } = req.params;
      const getOneReview = await this.spotService.getOneReview(
        +spotId,
        +reviewId,
        userId,
      );
      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: '명소 상세 리뷰 조회 성공',
        data: getOneReview,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default SpotController;
