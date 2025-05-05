import fetch from 'node-fetch';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import SpotService from '../services/spot.service.js';
import { KOREA_TOUR_DATA } from './../constants/env.constant.js';
import axios from 'axios';
class SpotController {
  spotService = new SpotService();

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
      const userId = req.user.id;
      const deleteSpot = await this.spotService.deleteSpot(+spotId, userId);
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

  // 명소 등록
  setSpot = async (req, res, next) => {
    try {
      //사진을 저장할 파일 위치 경로
      const imageUrl = req.files[0].location;
      const userId = req.user.userId;
      const { spotName, extraInfo, categoryList } = req.body;
      console.log(req.body);
      const setSpot = await this.spotService.setSpot(
        spotName,
        imageUrl,
        extraInfo,
        userId,
        categoryList,
      );
      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: 'MESSAGES.CITY.SET_SPOT.SUCCEED',
        data: setSpot,
      });
    } catch (err) {
      next(err);
    }
  };

  // 명소 사진 공개/비공개 전환
  changeVisibility = async (req, res, next) => {
    try {
      const { spotId } = req.params;
      const user = req.user;

      const changeVisibility = await this.spotService.changeVisibility(
        +spotId,
        user.userId,
      );
      console.log(changeVisibility);
      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: '명소 사진 공개 성공',
        data: changeVisibility,
      });
    } catch (err) {
      next(err);
    }
  };

  // 사용자가 올린 전체 명소 조회
  getAllSpot = async (req, res, next) => {
    try {
      const categoryList = req.query.category;
      const getAllSpot = await this.spotService.getAllSpot(categoryList);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: '명소 전체 조회 성공',
        data: getAllSpot,
      });
    } catch (err) {
      next(err);
    }
  };

  // 명소 외부 API 조회
  getExternalSpot = async (req, res, next) => {
    try {
      const serviceKey = KOREA_TOUR_DATA;
      const reqUrl = `https://apis.data.go.kr/B551011/PhotoGalleryService1/galleryList1?serviceKey=${serviceKey}&arrange=C&MobileOS=ETC&MobileApp=AppTesting&numOfRows=100&pageNo=1&_type=json`;
      const response = await axios.get(reqUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0', // 💡 중요: 브라우저처럼 위장
        },
      });
      console.log('✅ 외부 API 응답:', JSON.stringify(response.data, null, 2));
      const data = response.data;
      res.json(data.response.body.items.item); // 클라이언트에도 전송
    } catch (err) {
      next(err);
    }
  };

  // 명소 수정
  updateSpot = async (req, res, next) => {
    try {
      const { extraInfo, categoryList } = req.body;
      const { spotId } = req.params;
      const userId = req.user.id;
      const data = await this.spotService.updateSpot(
        extraInfo,
        +spotId,
        userId,
        categoryList,
      );

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: '명소 수정 성공',
        data,
      });
    } catch (err) {
      next(err);
    }
  };
}

export default SpotController;
